"use client";
// ----------------------------
// Imports
// ----------------------------
import stateStore from "@/store/zuStore";
import {Bolt, LogOut, User2Icon} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import Cookies from "js-cookie";
import {profileDropdownLinks} from "../global/constants";
import Link from "next/link";

// ----------------------------
// Profile Dropdown code starts here
// ----------------------------
const ProfileDropdown = () => {
  const {user, userName} = stateStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const divRef = useRef<HTMLDivElement>(null);

  // ----------------------------
  // Open & closes Dropdown code
  // ----------------------------
  const handleDropdown = () => setOpen(!open);
  // ----------------------------
  // Logs out user
  // ----------------------------
  const handleLogout = () => {
    Cookies.remove("serviceToken");
    Cookies.remove("userName");
    location.reload();
  };

  // ----------------------------
  // If a user clicks outside the screen, it'll close the dropdown
  // ----------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ----------------------------
  // Only render if not on the login page
  // ----------------------------
  if (pathname.includes("/mp/login")) return null;
  return (
    <div className="flex items-center justify-center">
      <div
        className={`bg-white border dark:border-none flex items-center justify-center dark:bg-[#253852] cursor-pointer size-10 rounded-full`}
        onClick={handleDropdown}
      >
        <p className="text-black dark:text-dark-primary-text">
          {userName ? userName[0].toUpperCase() : ""}
        </p>
      </div>
      {open && (
        <div
          ref={divRef}
          className="fixed top-8 right-5 mt-7 w-52 z-10 rounded-md shadow-lg bg-white dark:bg-dark-custom-blue border dark:border-dark-custom-blue-stroke"
        >
          {profileDropdownLinks.map((dropdownLinks, index) => (
            <div
              key={index}
              className="px-2 space-y-2 py-2 hover:bg-light-light-white hover:dark:bg-dark-text-hover"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Link
                href={
                  dropdownLinks.title == "My Profile"
                    ? dropdownLinks.href +
                      userName.replace(/\s+/g, "").toLowerCase() +
                      "-" +
                      user?.id.slice(-2)
                    : dropdownLinks.href
                }
                className="flex items-center px-1 py-2 text-sm text-light-light-black dark:text-dark-secondary-text rounded transition-all cursor-pointer"
                role="menuitem"
              >
                {dropdownLinks.icon}
                {dropdownLinks.title}
              </Link>
            </div>
          ))}
          <div className="px-2 space-y-2 py-2 hover:bg-light-light-white hover:dark:bg-dark-text-hover">
            {user?.role === "admin" && (
              <Link
                target="_blank"
                href={"https://admin-mypath.vercel.app/login"}
                className="flex items-center px-1 py-2 text-sm text-light-light-black dark:text-dark-secondary-text rounded transition-all cursor-pointer"
                role="menuitem"
              >
                <User2Icon className="icon-color mr-3" />
                {"Admin Panel"}
              </Link>
            )}
          </div>
          <div className="border-t border-[#1a2736]"></div>
          <div
            onClick={handleLogout}
            className="flex items-center px-4 py-4 text-sm text-light-light-black dark:text-dark-secondary-text rounded transition-all hover:bg-light-light-white hover:dark:bg-dark-text-hover cursor-pointer"
            role="menuitem"
          >
            <LogOut
              className="mr-3 h-5 w-5 text-light-light-black dark:text-dark-secondary-text"
              aria-hidden="true"
            />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
