// ------------------------
// Imports
// ------------------------
import {Metadata} from "next";
import UserName from "./components/UserName";
import ProfileSettings from "./components/ContentArea";

// ------------------------
// User profile details
// ------------------------
export const metadata: Metadata = {
  title: "User Profile | MyPath AI",
  description: "View and update your personal information.",
  icons: "/Logo/logo.svg",
};

// ------------------------
// User profile code starts here
// ------------------------
export default function UserProfile() {
  return (
    <>
      <section className="text-dark-primary-text bg-white dark:bg-dark-custom-dark-blue h-screen">
        <UserName />
        <ProfileSettings />
      </section>
    </>
  );
}
