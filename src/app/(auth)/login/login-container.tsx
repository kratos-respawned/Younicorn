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
    <Card className=" max-w-sm w-full">
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
      <CardContent className="">
        <Button
          disabled={isLoading}
          className="mx-auto flex"
          onClick={() => OAuthLogin("github")}
          variant="outline"
        >
          <Github className="mr-2 h-4 w-4" />
          Github
        </Button>
      </CardContent>
    </Card>
  );
}
