"use client";
// ------------------------
// Imports
// ------------------------
import {useEffect, useState} from "react";
import stateStore from "@/store/zuStore";

// ------------------------
// Username code starts here
// ------------------------
const UserName = () => {
  const userName = stateStore((state) => state.userName); // Access userName reactively
  const [currentDate, setCurrentDate] = useState("");
  
  // ------------------------
  // Shows current day & date
  // ------------------------
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short", // Abbreviated weekday, e.g., "Mon"
        month: "short", // Abbreviated month, e.g., "Nov"
        day: "numeric", // Numeric day, e.g., "28"
        year: "numeric", // Full year, e.g., "2024"
      };
      setCurrentDate(now.toLocaleDateString(undefined, options));
    };

    updateDate(); // Set initial value
    const interval = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="pl-14 py-2 fixed grid items-center border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-custom-dark-blue w-full z-10">
      <p className="font-semibold text-black dark:text-dark-primary-text">{userName}</p>
      <span className="text-xs text-gray-500 ">{currentDate}</span>
    </div>
  );
};

export default UserName;
