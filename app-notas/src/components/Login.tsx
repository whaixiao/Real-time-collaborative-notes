import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const Login = () => {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Notas Colaborativas</h2>
      <button 
        onClick={handleSignIn}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};