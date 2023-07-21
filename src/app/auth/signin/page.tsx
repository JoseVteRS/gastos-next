'use client'
import { signIn } from "next-auth/react";


export default function SigninPage() {
  return (
    <div className="h-screen grid place-content-center">
      <div className="mb-5">
        <h1 className="font-bold text-3xl">Inicia sesión</h1>
        <p>Para empezar a registrar tus gastos y llevar un control</p>
      </div>

      <button onClick={() => signIn('google', {
        callbackUrl: 'http://localhost:3000'
      })}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4"
      >
        Inicia sesión con Google
      </button>
    </div>
  );
}