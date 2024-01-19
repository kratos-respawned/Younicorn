import { LoginContainer } from "@/app/(auth)/login/login-container";
import { getServerAuth } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerAuth();
  if (session) {
    redirect("/dashboard/files");
  }
  return (
    <main className=" min-h-screen grid place-items-center px-4">
      <LoginContainer />
    </main>
  );
};

export default Login;
