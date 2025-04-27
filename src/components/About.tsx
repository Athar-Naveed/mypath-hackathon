import Image from "next/image";
import about from "../assets/images/About/Img.svg";
import {AboutContent} from "@/data/constants";
const About = () => {
  return (
    <div className="container mx-auto px-4 lg:px-6 max-w-7xl" id="about">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mt-6 md:mt-14">
        {/* Image */}
        <div>
          <Image
            src={about || "/placeholder.svg"}
            width={100}
            height={100}
            className="w-[200px] h-[200px] md:w-[410px] md:h-[450px]"
            alt="About Image"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center sm:items-start w-full">
          <div className="text-[#1D68FF] font-normal text-sm tracking-[4px] uppercase leading-5 text-center sm:text-left font-promixa">
            {AboutContent.featureTitle}
          </div>

          <div className="text-[48px] font-semibold text-black dark:text-white tracking-[-1px] leading-[58px] mt-3 text-center sm:text-left">
            {AboutContent.mainHeading}
          </div>

          <div className="text-[20px] font-light text-black dark:text-white mt-4 font-promixa text-center sm:text-left">
            {AboutContent.subHeading}
          </div>

          {/* Uncomment if you want the button */}
          {/* 
          <button className="mt-4 bg-[#141219] text-black border-2 border-[#7286FF] text-base leading-6 w-40 flex justify-center items-center py-3 px-5 rounded-full font-bold cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#7286FF] hover:text-[#141219] font-promixa">
            {AboutContent.buttonText}
          </button>
          */}
        </div>
      </div>
    </div>
  );
};

export default About;
