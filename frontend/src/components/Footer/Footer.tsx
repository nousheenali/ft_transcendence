import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer p-4 text-base-content bg-zinc-900 shadow-inner border-t border-main-text items-center">
      <div className="flex items-center">
        <Image
          alt="Company logo"
          src="/GANSY_Logo.svg"
          width={100}
          height={100}
        />
        <p className="font-saira-condensed text-main-text text-sm font-bold ml-2">
          Copyright © 2023 Gansy All. right reserved
        </p>
      </div>
    </footer>
  );
}
