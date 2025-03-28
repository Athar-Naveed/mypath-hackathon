import {Send} from "lucide-react";

const Button = ({title, place}: {title: string; place: string}) => {
  const handleClick = () => (window.location.href = "/mp/login");
  return (
    <>
      {/* Blue border animation overlay */}
      {place === "Navbar" ? (
        <button
          onClick={handleClick}
          className="group relative overflow-hidden rounded-full border border-dark-logo-primary bg-transparent px-4 py-2 font-poppins font-semibold text-dark-logo-primary transition-colors hover:text-white"
        >
          {/* Blue border animation overlay */}
          <span className="absolute inset-0 -z-10 h-full w-0 bg-dark-logo-primary transition-all duration-300 ease-out group-hover:w-full"></span>

          {title}
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="group flex items-center gap-2 overflow-hidden rounded-full border border-dark-logo-primary 
      bg-white px-4 py-2 font-poppins font-semibold text-dark-logo-primary transition-colors"
        >
          {title}
          <Send className="size-5 hidden group-hover:flex" />
        </button>
      )}
    </>
  );
};

export default Button;
