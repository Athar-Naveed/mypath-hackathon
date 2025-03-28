"use client";

import {useState} from "react";
import Link from "next/link";
import {NavItems} from "@/data/constants";
import {Squash as Hamburger} from "hamburger-react";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex md:hidden ">
      <div className=" w-full">
        <div className="flex justify-end items-center">
          <div className="flex items-center text-black dark:text-white">
            <Hamburger size={18} color="blue" toggled={isOpen} toggle={setIsOpen} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-black absolute top-full -left-1 w-full">
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 ">
            {NavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium text-black dark:text-white active:text-blue-500`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
