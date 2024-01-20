"use client";
import { Github, GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import LoginPage from "./login-form";
import LoginForm from "./login-form";
type OAuthProviders = "github" | "google";
export function LoginContainer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const OAuthLogin = async (provider: OAuthProviders) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: "/dashboard/files",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className=" w-full max-w-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-cal ">
          <span className="text-primary">You</span>nicorn
        </CardTitle>
        <CardDescription className="text-lg pt-2">
          <span className="font-semibold font-cal block">Sign in</span>
          <span>
            to continue to{" "}
            <span className="font-semibold font-cal">Younicorn</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
