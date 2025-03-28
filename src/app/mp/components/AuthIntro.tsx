// ----------------------------
// Imports
// ----------------------------
import Link from "next/link";
import Image from "next/image";
// ----------------------------
// Auth Intro code starts here: Its a code being used by both Login and Register pages
// ----------------------------
const AuthIntro = ({value = "Back"}: {value?: string}) => {
  return (
    <>
      <div className="text-center mb-8">
        <Link href={"/"}>
          <Image
            className="mx-auto"
            src={"/Logo/logo.svg"}
            width={50}
            height={50}
            alt={"MyPath AI"}
          />
        </Link>
        <h2 className="text-4xl font-bold mb-2">Welcome {value} 👋</h2>
        <p className="text-dark-custom-dark-blue mx-5">
          Unleash your true potential. Leverage the power of AI to supercharge your productivity.
        </p>
      </div>
    </>
  );
};
export default AuthIntro;
