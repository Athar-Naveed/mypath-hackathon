"use client";
import {motion} from "framer-motion";
import Image from "next/image";
import {OurTeam} from "@/data/constants";
const MeetOurTeam = () => {
  return (
    <div className="mt-12 sm:mt-15 px-0.5" id="team">
      <div className="container mx-auto px-4 xl:px-6 max-w-screen-xl">
        <div className="cursor-pointer flex flex-col justify-center items-center w-full overflow-hidden">
          <div className="text-[48px] font-semibold text-black dark:text-white tracking-[-1px] leading-[58px] mt-3 text-center">
            {OurTeam.title}
          </div>

          <div className="text-[20px] font-light text-gray-500 text-center mt-2 w-[90%] md:w-1/2">
            {OurTeam.subTitle}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 w-full md:w-4/5 lg:w-full my-20">
            {OurTeam.team.map((member, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className="p-2"
              >
                <div className="w-full h-[300px] relative overflow-hidden mx-auto">
                  <div className="w-full h-full relative">
                    <Image
                      src={member.img || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                    <h6 className="text-white font-semibold text-lg">{member.name}</h6>
                    <p className="text-[#cccccc] text-sm">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeam;
