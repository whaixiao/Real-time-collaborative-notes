import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import { Login } from './components/Login';
import { Editor } from './components/Editor';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged verifica la sesión activa en Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div>
          <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f0f0f0' }}>
            <span>Usuario: {user.email}</span>
            <button onClick={() => auth.signOut()}>Cerrar sesión</button>
          </header>
          <main>
            {/* Usamos un ID de nota fijo por ahora ("nota-1") para probar la colaboración */}
            <Editor noteId="nota-1" />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;