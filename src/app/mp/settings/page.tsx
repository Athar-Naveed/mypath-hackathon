// ----------------------
// Imports
// ----------------------
import {Metadata} from "next";
import STop from "./components/Stop";
import {Toaster} from "react-hot-toast";
// ----------------------
// Setting details
// ----------------------
export const metadata: Metadata = {
  title: "Settings | MyPath AI",
  description: "View and update your settings.",
  icons: "/Logo/logo.svg",
};

// ----------------------
// Setting code starts here
// ----------------------
export default function Settings() {
  return (
    <>
      <section className="bg-white/80 dark:bg-dark-custom-dark-blue h-screen">
        <div className="pt-5">
          <STop />
        </div>
        <Toaster />
      </section>
    </>
  );
}
