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

export default function AppCard({ gitUrl, url, name, status }: Application) {
  return (
    <Card className="mx-auto w-full max-w-[400px] hover:outline outline-1 ">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex gap-3 font-medium">
            <Braces className=" rounded-full my-auto text-2xl" />
            <div>
              <p className="text-xs sm:text-sm text-left font-bold tracking-wide">
                {name}
              </p>

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
          <Badge
            variant={status === "FAILED" ? "destructive" : "default"}
            className="tracking-wider"
          >
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <span className="font-medium  text-xs sm:text-sm line-clamp-1 overflow-clip  rounded-2xl bg-[#292828] px-3 pr-11 py-1 hover:underline cursor-pointer">
          {gitUrl}
        </span>
      </CardContent>
      <CardFooter className="mt-2 flex-col items-start">
        <p className="text-xs sm:text-sm font-bold text-[#797979]">
          type error fixed{" "}
        </p>
        <p className="text-xs sm:text-sm text-[#797979] font-semibold">
          54d ago
        </p>
      </CardFooter>
    </Card>
  );
}
