"use client";

import {useState, useRef, useEffect} from "react";
import Link from "next/link";
import {User2Icon, LogOut, ChevronDown, ExternalLink} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {generateColor, getInitials, profileDropdownLinks} from "../global/constants";
import stateStore from "@/store/zuStore";
import Cookies from "js-cookie";
import {useChatbotStore} from "../../store/chatbotStore";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const {user, userName} = stateStore();
  const {setFetchChat, setNewChat} = useChatbotStore();
  const handleDropdown = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    Cookies.remove("serviceToken");
    setFetchChat(false);
    setNewChat(true);
    location.reload();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [open]);

  const avatarColor = generateColor(userName);

  return (
    <div className="relative flex items-center justify-center">
      <div
        ref={avatarRef}
        className={`relative flex items-center gap-2 cursor-pointer group`}
        onClick={handleDropdown}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="User menu"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleDropdown();
          }
        }}
      >
        {/* Avatar */}
        <div
          className={`
          size-10 rounded-full flex items-center justify-center
          bg-white dark:bg-[#253852] 
          border-2 border-gray-200 dark:border-gray-700
          shadow-sm hover:shadow-md
          transition-all duration-200 ease-in-out
          ${open ? "ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-gray-900" : ""}
          group-hover:border-blue-300 dark:group-hover:border-blue-700
        `}
        >
          {user?.img ? (
            <img
              src={user?.img || "/Logo/logo.svg"}
              alt={userName}
              className="size-full rounded-full object-cover"
            />
          ) : (
            <div
              className={`size-full rounded-full flex items-center justify-center ${avatarColor}`}
            >
              <span className="font-medium text-sm">{getInitials(userName)}</span>
            </div>
          )}

          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 block size-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"></span>
        </div>

        {/* Dropdown indicator (optional) */}
        <ChevronDown
          className={`hidden sm:block h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dropdownRef}
            initial={{opacity: 0, y: 10, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 10, scale: 0.95}}
            transition={{duration: 0.15, ease: "easeOut"}}
            className="absolute top-full right-0 mt-2 w-64 z-50 origin-top-right"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-[#1a2b42] border border-gray-200 dark:border-gray-700/50">
              {/* User info header */}
              <div className="px-4 py-3 bg-gray-50 dark:bg-[#253852]">
                <div className="flex items-center gap-3">
                  <div
                    className={`size-12 rounded-full flex items-center justify-center ${avatarColor}`}
                  >
                    <span className="font-medium">{getInitials(userName)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      ID: {user?.id.slice(-6)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-2">
                {profileDropdownLinks.map((dropdownLink, index) => (
                  <Link
                    key={index}
                    href={
                      dropdownLink.title === "My Profile"
                        ? dropdownLink.href +
                          userName.replace(/\s+/g, "").toLowerCase() +
                          "-" +
                          user?.id.slice(-2)
                        : dropdownLink.href
                    }
                    className="group flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-[#2a3f5a] transition-colors"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    {dropdownLink.icon}
                    <span className="text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {dropdownLink.title}
                    </span>
                  </Link>
                ))}

                {/* Admin panel link */}
                {user?.role === "admin" && (
                  <Link
                    href="https://admin-mypath.vercel.app/signin"
                    target="_blank"
                    className="group flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-[#2a3f5a] transition-colors"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    <User2Icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                    <span className="text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      Admin Panel
                    </span>
                    <ExternalLink className="ml-auto h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                  </Link>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

              {/* Logout button */}
              <div className="py-1.5">
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  role="menuitem"
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                  <span className="text-gray-700 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
