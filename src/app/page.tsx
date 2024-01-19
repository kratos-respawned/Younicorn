import { env } from "@/env.mjs";
import Image from "next/image";

export default function Home() {
  return <main>{env.DATABASE_URL}</main>;
}
