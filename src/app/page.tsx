import Posts from "@/components/posts";
import { Button, buttonVariants } from "@/components/ui/button";
import { getServerAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuth();
  return (
    <section className="h-[100dvh] grid place-items-center w-full ">
      <div className="text-center relative ">
        <span className="-z-10 absolute w-32  aspect-square top-4 blur-3xl  -translate-y-full max-sm:-left-0 -left-9 -translate-x-full  rounded-full bg-primary" />
        <h1 className=" text-[clamp(2.5rem,10vw,5rem)] text-balance  font-heading py-2">
          Unleash{" "}
          <span className="decoration-wavy underline decoration-primary decoration-from-font underline-offset-2 italic">
            {" "}
            Hosting{" "}
          </span>{" "}
          Magic
          {/* Embrace the Hosting Odyssey */}
        </h1>
        <p className="text-[clamp(1rem,5vw,1.5rem)] font-sans pb-3">
          Making self hosting as fun as naming variables!
        </p>
        <div className="flex justify-center items-center gap-x-4">
          <Link
            href={session?.user ? "/dashboard/" : "/login"}
            className={cn(
              buttonVariants({
                variant: "default",
                className: "",
              })
            )}
          >
            Get Started
          </Link>
          <Link
            href={"/docs"}
            target="_blank"
            referrerPolicy="no-referrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "",
              })
            )}
          >
            Docs
          </Link>
        </div>
        
      </div>
    </section>
  );
}
