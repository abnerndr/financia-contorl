"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 import do router
import { LoginForm } from "./components/Forms/LoginForm";
import { RegisterForm } from "./components/Forms/RegisterForm";


export default function Home() {
  const [isLogin, setIsLogin] = useState(false);


  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-gray-800 bg-gray-900 p-8 pb-12">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-semibold text-white transition-all duration-500">
            {isLogin ? "Login" : "Registrar"}
          </h2>
        </div>

        {/* Formulários */}
        <div className="relative h-[260px]">
      {isLogin ?
      <>
       {/* Formulário de Login */}
        <LoginForm isLogin={isLogin} />
      </>
      :
      <>
      {/* Formulário de Registro */}
       <RegisterForm isLogin={isLogin} />
      </> }
         
        </div>

        {/* Alternador de formulário */}
        <div className="mt-10 text-center">
          {isLogin ? (
            <p className="text-sm text-gray-500">
              Ainda não tem uma conta?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-indigo-400 hover:text-indigo-500 transition"
              >
                Registrar
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Já tem uma conta?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-indigo-400 hover:text-indigo-500 transition"
              >
                Logar
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
