"use client";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {Menu, ChevronsLeft} from "lucide-react";
import {sideNavigation} from "./constants";
import CurrentPlan from "../Cards/Plans/CurrentPlan";
import ProfileDropdown from "../Profile/ProfileDropdown";
import stateStore from "@/store/zuStore";
import {useWindowSize} from "../WindowSize";

const Sidebar = () => {
  // State management
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const {selectedChat} = stateStore();
  const width = useWindowSize();

  // Don't show sidebar on Login
  if (pathname.includes("login")) return null;

  // Toggle drawer for mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar content
  const sidebarContent = (
    <div className="bg-white border-r border-slate-200 dark:border-slate-700 dark:bg-dark-custom-blue h-screen flex flex-col">
      {/* Logo section */}
      <div className="flex flex-row px-5 justify-between items-center">
        <Link href={"/mp/chatbot"}>
          <Image
            src={"/Logo/logo.svg"}
            width={50}
            height={50}
            alt={"MyPath AI"}
            className="py-8"
            priority={false}
          />
        </Link>
        <ChevronsLeft
          onClick={handleDrawerToggle}
          size={28}
          className="icon-color cursor-pointer md:hidden"
        />
      </div>

      {/* Navigation items */}
      <div className="mr-5 ml-2 flex flex-col gap-2 flex-1 overflow-y-auto">
        {sideNavigation.map((item) => (
          <div
            key={item.title}
            className={`
              ${
                pathname === item.href
                  ? "bg-light-light-blue text-blue dark:bg-dark-text-hover dark:text-dark-secondary-text"
                  : "text-slate-500"
              } rounded-md py-1 hover:dark:bg-dark-text-hover transition-all dark:text-dark-secondary-text
            `}
          >
            <Link
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-3 py-2"
            >
              <span className="mr-3 min-w-10">{item.icon}</span>
              <span className="text-xs md:text-[14px] xl:text-base">{item.title}</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Payment plans */}
      <div className="w-full border-t border-slate-300 dark:border-slate-600 p-3 pb-4 mt-auto">
        <CurrentPlan />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header with Menu Button */}
      {width <= 768 && !selectedChat && (
        <div className="fixed top-0 left-0 w-full md:hidden z-10 p-2 flex items-center justify-between">
          <button onClick={handleDrawerToggle} className="p-2 rounded-md" aria-label="open drawer">
            <Menu className="text-light-light-black dark:text-dark-primary-text bg-white dark:bg-dark-custom-blue" />
          </button>
          <ProfileDropdown />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleDrawerToggle}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-[220px] sm:w-[220px] transform transition-transform duration-300 ease-in-out
          md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {sidebarContent}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 w-[260px] lg:w-[300px] h-full z-30">
        {sidebarContent}
      </div>

      {/* Main Content Margin */}
      <div className="md:ml-[260px] lg:ml-[300px]">
        {/* This is where the main content would go */}
      </div>
    </>
  );
};

export default Sidebar;
