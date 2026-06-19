import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { ref, onValue, set } from 'firebase/database'; // Importaciones de Realtime Database
import { db } from '../firebase';

interface EditorProps {
  noteId: string;
}

export const Editor = ({ noteId }: EditorProps) => {
  const [text, setText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. Escuchar cambios en tiempo real
  useEffect(() => {
    // Apuntamos a la ruta de la nota en la base de datos
    const noteRef = ref(db, 'notes/' + noteId);
    
    // onValue es el equivalente a onSnapshot en Realtime Database
    const unsubscribe = onValue(noteRef, (snapshot) => {
      const data = snapshot.val();
      if (data && !isTyping) {
        setText(data.content || '');
      }
    });

    return () => unsubscribe();
  }, [noteId, isTyping]);

  // 2. Manejar la escritura y enviar cambios
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setIsTyping(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const noteRef = ref(db, 'notes/' + noteId);
      // set sobrescribe los datos en esa ruta
      await set(noteRef, { content: newText });
      setIsTyping(false); 
    }, 500);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Escribe tu nota aquí... (los cambios se guardan automáticamente)"
        style={{ width: '100%', height: '400px', padding: '10px', fontSize: '16px' }}
      />
    </div>
  );
};