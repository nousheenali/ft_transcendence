import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-screen p-2 md:p-4 bg-zinc-900 shadow-inner border-t border-main-text items-center">
      <div className="flex items-center justify-center md:justify-start flex-wrap">
        <Image
          alt="Company logo"
          src="/GANSY_Logo.svg"
          width={80}
          height={80}
          className="mb-2 md:mb-0 md:mr-2"
        />
        <p className="font-saira-condensed text-main-text text-xs md:text-sm font-bold text-center md:text-left">
          Copyright © 2023 Gansy All. right reserved
        </p>
      </div>
    </footer>
  );
}