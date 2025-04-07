"use client";
import Link from "next/link";
import ProfileDropdown from "../Profile/ProfileDropdown";
import Image from "next/image";
import Button from "../Buttons/button";
import {usePathname} from "next/navigation";
import {navLinks} from "./constants";
import {useMainAppStore} from "../../store/mainAppStore";
const Navbar = () => {
  const path = usePathname();
  const {dark, setDark} = useMainAppStore();
  if (path.match("/mp/login")) return null;
  const toggleDarkMode = () => setDark(!dark);
  return (
    <header className="fixed w-full z-10 bg-white dark:bg-dark-text-hover lg:bg-transparent dark:lg:bg-transparent flex justify-between items-center p-2 shadow-md md:shadow-none">
      {/* Left side - MyPath logo */}
      <div className="flex-shrink-0">
        <Link href={path} className="flex items-center gap-2">
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
          <ul className="flex items-center mr-4 gap-4">
            {navLinks.map((link, index) => (
              <li key={index} className="flex items-center gap-2">
                <Button title={link.title} icon={<link.icon />} />
              </li>
            ))}
          </ul>
          <button
            onClick={toggleDarkMode}
            className="mr-5 size-10 flex justify-center items-center rounded-full bg-gray-100 transition-colors"
          >
            {dark ? (
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <ProfileDropdown />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
