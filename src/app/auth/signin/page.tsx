'use client'
import { signIn } from "next-auth/react";


export default function SigninPage() {
  return (
    <div className="h-screen grid place-content-center">
      <div className="mb-5">
        <h1 className="font-bold text-3xl">¡Hola!</h1>
        <p>Inicia sesión para empezar a registrar tus gastos</p>
      </div>

      <button onClick={() => signIn('google', {
        callbackUrl: 'https://josevte.com'
      })}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4"
      >
        Inicia sesión con Google
      </button>
    </div>
  );
}
