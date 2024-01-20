"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import React from "react";

const LoginForm = () => {
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
      <Input
        ref={emailRef}
        placeholder="email"
        // className="rounded py-1 px-2 bg-white/30"
        name="email"
        type="email"
      />
      <Input
        ref={passwordRef}
        placeholder="password"
        // className="rounded py-1 px-2 "
        name="password"
        type="password"
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
