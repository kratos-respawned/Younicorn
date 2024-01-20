"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Braces,
  MoreHorizontal,
  MoreHorizontalIcon,
  Shell,
  Star,
  Swords,
} from "lucide-react";
import { Badge } from "@components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Application } from "@prisma/client";
import { log } from "@/_actions/log";
import { halt } from "@/_actions/halt";
import { restart } from "@/_actions/restart";

export default function AppCard({ gitUrl, url, name, status }: Application) {
  return (
    <Card className="mx-auto w-full max-w-[400px] hover:outline outline-1 ">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex gap-3 font-medium">
            <Braces className=" rounded-full my-auto text-2xl" />
            <div>
              <Link
                href={`/dashboard/${name}`}
                className="text-xs sm:text-sm cursor-pointer text-left font-bold tracking-wide"
              >
                {name}
              </Link>

              <Link
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-xs sm:text-sm text-[#797979] line-clamp-1"
                href={`http://${url}`}
              >
                {url}
              </Link>
            </div>
          </div>
          <MoreOpions name={name} status={status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <span className="font-medium  text-xs sm:text-sm line-clamp-1 overflow-clip  rounded-2xl bg-[#292828] px-3 pr-11 py-1 hover:underline cursor-pointer">
          {gitUrl}
        </span>
      </CardContent>
      <CardFooter className="mt-2 flex-col items-start">
        <Badge
          variant={status === "FAILED" ? "destructive" : "default"}
          className="tracking-wider"
        >
          {status}
        </Badge>
      </CardFooter>
    </Card>
  );
}

const MoreOpions = ({ name, status }: { name: string; status: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"} className="relative h-8 w-8 ">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="center" forceMount>
        <form>
          {status != "HALTED" ? (
            <Button
              formAction={async () => await halt(name)}
              variant={"ghost"}
              className=" w-full"
            >
              Halt
            </Button>
          ) : (
            <Button
              formAction={async () => await restart(name)}
              variant={"ghost"}
              className=" w-full"
            >
              Resume
            </Button>
          )}

          <DropdownMenuSeparator />
          <Button
            formAction={log}
            variant={"ghost"}
            className="hover:bg-destructive/50 w-full"
          >
            Delete
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
