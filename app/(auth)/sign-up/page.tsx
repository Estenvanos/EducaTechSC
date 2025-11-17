"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp();
  
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!isLoaded) return;

  if (password.length < 8) {
    setError("A senha deve ter pelo menos 8 caracteres.");
    return;
  }

  setError("");
  setLoading(true);

  try {
    const result = await signUp.create({
      emailAddress: email,
      password,
      firstName: fullName,
    });

    if (result.status === "complete") {
      router.push("/");
    } else {
      await signUp.reload();
      router.push("/");
    }
  } catch (err) {
    console.error(err);
    setError("Erro ao criar conta. Verifique os dados.");
  } finally {
    setLoading(false);
  }
};


  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error(err);
      setError("Erro ao entrar com Google.");
      setLoading(false);
    }
  };

  return (
    <div className="size-full flex flex-col items-center">
      <div className="flex flex-col gap-1 w-full p-2 place-items-center">
        <p className="text-black font-bold text-4xl tracking-wider">
          Cadastre-se!
        </p>
        <p className="text-black font-bold text-xl">
          Crie sua conta e comece a aprender
        </p>
      </div>

      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-3 place-items-center-safe mt-4 w-full max-w-sm"
      >
        <div className="flex flex-col w-full">
          <label
            htmlFor="name"
            className="text-sm font-semibold uppercase tracking-widest text-gray-600/80"
          >
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            placeholder="Seu nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full py-4 px-4 mt-1 font-bold bg-gray-200 text-gray-700 placeholder-gray-500 text-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label
            htmlFor="email"
            className="text-sm font-semibold uppercase tracking-widest text-gray-600/80"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-4 px-4 mt-1 font-bold bg-gray-200 text-gray-700 placeholder-gray-500 text-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label
            htmlFor="password"
            className="text-sm font-semibold uppercase tracking-widest text-gray-600/80"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-4 px-4 mt-1 font-bold bg-gray-200 text-gray-700 placeholder-gray-500 text-xl rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && <p className="text-red-600 font-bold">{error}</p>}

        <div className="flex flex-col w-full max-w-sm mt-7 place-items-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-68 py-4 px-4 bg-[#1800ad] cursor-pointer text-white text-xl font-bold rounded-md shadow-lg transition duration-300 ease-in-out hover:opacity-90 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Criando conta..." : "CADASTRAR"}
          </button>
        </div>
      </form>

      <div className="text-center pt-4">
        <p className="text-lg text-gray-700 font-bold">
          Já tem cadastro?{" "}
          <a href="/sign-in" className="text-indigo-700 font-bold underline">
            ENTRE
          </a>
        </p>
      </div>

      <div className="h-0.5 bg-gray-700 w-full max-w-sm mt-6" />

      <div
        onClick={handleGoogleSignUp}
        className="mt-6 flex flex-row gap-6 cursor-pointer border-2 h-18 border-black w-full max-w-sm p-2 rounded-full items-center justify-center hover:bg-gray-100 transition"
      >
        <p className="text-2xl text-black font-bold">CADASTRO COM</p>
        <Image src="/google.webp" alt="google" width={60} height={60} />
      </div>
    </div>
  );
};

export default SignUp;
