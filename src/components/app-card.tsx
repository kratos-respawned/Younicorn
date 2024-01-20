import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MoreHorizontal, MoreHorizontalIcon, Shell, Star, Swords } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"

export default function AppCard() {
  return (
    <Card className="w-[400px] hover:outline outline-1 ">
      <CardHeader>
        <CardTitle className="flex justify-between">
            <div className="flex gap-3 font-medium">
            <Swords className="border-2 border-white rounded-full my-auto text-2xl"/>
            <div>
                <p className="text-sm font-bold tracking-wide">nextjs-dashboard</p>
                <p className="text-sm text-[#797979]">nextjs-dashboard-kappa</p>
            </div>
            </div>
            <div className="flex gap-4">
            <MoreOptions/>
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex gap-1 text-white rounded-2xl bg-[#292828] my-auto w-fit px-3 py-1 hover:underline cursor-pointer">
        <Shell className="my-auto p-1"/>
        <p className="font-medium text-sm">Harsh-uu/nextjs-papa</p>
        </div>
        <div>
        <Shell className="my-auto"/>
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex-col items-start">
        <p className="text-sm font-bold text-[#797979]">type error fixed </p>
        <p className="text-sm text-[#797979] font-semibold">54d ago</p>
      </CardFooter>
    </Card>
  )
}

const MoreOptions = () => {
    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"} className="relative h-8 w-8 ">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Harsh Papa</p>
              <p className="text-xs leading-none text-muted-foreground">
                papaji@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
                <div className="flex justify-between">
              <Link href="/dashboard/files">Add Favourite</Link>
              <Star className="h-4 w-4 hover:text-[#dc2521]"/>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/comingSoon">Halt</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            // onClick={() => signOut({ callbackUrl: "/" })}
            className="focus:bg-destructive/80"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}