"use client";
import { signIn } from "next-auth/react";
import React from "react";

const LoginPage = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      console.log({ response });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className="mx-auto max-w-md flex flex-col gap-3 border border-black  text-white"
    >
      <input
        ref={emailRef}
        className="rounded py-1 px-2 bg-white/30"
        name="email"
        type="email"
      />
      <input
        ref={passwordRef}
        className="rounded py-1 px-2 bg-white/30"
        name="password"
        type="password"
      />
      <button className="rounded py-1 px-2 bg-white text-black" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
