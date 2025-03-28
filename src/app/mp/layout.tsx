// ----------------------
// Imports
// ----------------------
import "./mp.css";
import Sidebar from "./components/global/Sidebar";
import ProfileDropdown from "./components/Profile/ProfileDropdown";
import {Poppins} from "next/font/google";
import Navbar from "./components/global/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose weights
  variable: "--font-poppins",
});

// ----------------------
// MP code starts here
// ----------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="">
        {/* <Sidebar /> */}
        <Navbar />
        <main className={`flex-1 relative ${poppins.className}`}>{children}</main>
      </div>
    </>
  );
}
