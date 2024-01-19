import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="absolute inset-x-0 bottom-0 text-center py-5 text-sm">
      <p className="relative group cursor-pointer">
        Made with <span className="peer hidden dark:inline">🤍</span>{" "}
        <span className="peer inline dark:hidden">🖤</span>
        <Image
          className="  block w-[100px] h-[100px] cursor-auto grayscale peer-hover:grayscale-0   transition-all duration-500 peer-hover:opacity-100 peer-hover:pointer-events-auto pointer-events-none opacity-0 absolute top-0 -translate-y-full left-1/2 -translate-x-1/2"
          src="/computer.gif"
          alt="love"
          width={200}
          height={200}
        />{" "}
      </p>
      by
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/kratos-respawned"
        className=" inline-block relative ml-1 group hover:text-primary transition-colors"
      >
        @team-vortex
        {/* <Image
          className="  block w-[220px] h-[124px] cursor-auto grayscale group-hover:grayscale-0   transition-all duration-500 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none opacity-0 absolute top-0 -translate-y-full left-1/2 -translate-x-1/2"
          src="/gojo.gif"
          alt="love"
          width={200}
          height={200}
        /> */}
      </a>
    </footer>
  );
};
