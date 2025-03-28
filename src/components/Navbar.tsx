"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import MobileNavbar from "./MobileDrawer";
import {NavItems} from "@/data/constants";
import Image from "next/image";
import Button from "./Button/button";
export default function Navbar() {
  const path = usePathname();

  if (path.includes("mp")) return null;

  return (
    <div className="backdrop-blur-md sticky top-0 left-0 right-0 mx-auto w-full transition-all duration-400 z-10">
      <div className="container mx-auto max-w-screen-lg flex justify-between items-center">
        <Link href="/">
          <Image src="/Logo/logo.svg" alt="MyPath Logo" width={70} height={70} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-[11px]">
          {NavItems.map((item) => (
            <Link href={item.href} className="text-decoration-none p-2" key={item.label}>
              <div className="text-black hover:text-blue-500 transition-colors">{item.label}</div>
            </Link>
          ))}
        </div>
        <div className="try hidden md:flex gap-[11px]">
          <Button title={"Try MyPath"} place={"Navbar"} />
        </div>

        {/* Mobile Navigation */}
        <MobileNavbar />
      </div>
    </div>
  );
}
