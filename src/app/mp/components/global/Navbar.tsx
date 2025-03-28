"use client";
import Link from "next/link";
import ProfileDropdown from "../Profile/ProfileDropdown";
import Image from "next/image";
import {navLinks} from "./constants";
import Button from "../Buttons/button";
import {usePathname} from "next/navigation";
const Navbar = () => {
  const path = usePathname();
  if (path.match("/mp/login")) return null;
  return (
    <header className="fixed w-full z-10 bg-white dark:bg-dark-text-hover lg:bg-transparent dark:lg:bg-transparent flex justify-between items-center p-2 shadow-md md:shadow-none">
      {/* Left side - MyPath logo */}
      <div className="flex-shrink-0">
        <Link href="/mp/chatbot" className="flex items-center gap-2">
          <Image
            src={"/Logo/logo1.svg"}
            width={40}
            height={40}
            alt={"MyPath Logo"}
            priority={false}
          />
          <h1 className="hidden md:flex text-xl font-bold text-dark-logo-primary dark:text-light-light-white">
            MyPath
          </h1>
        </Link>
      </div>

      {/* Right side - About link */}
      <div>
        <nav className="flex">
          {/* <ul className="flex items-center mr-4">
            {navLinks.map((link, index) => (
              <li key={index} className="flex items-center gap-2">
                <Button title={link.title} icon={<link.icon />} />
              </li>
            ))}
          </ul> */}
          <ProfileDropdown />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
