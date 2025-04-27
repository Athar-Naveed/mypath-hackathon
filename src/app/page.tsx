import HomeHero from "@/components/ui/HomeHero";
// import Affilation from "../components/Affilation";
import MeetOurTeam from "../components/MeetOurTeam";
import About from "../components/About";
import Features from "@/components/ui/Features";
import FounderMessage from "@/components/FounderMessage";

export default function Home() {
  return (
    <>
      <HomeHero />
      {/* <Affilation /> */}
      <Features />
      {/* <About /> */}
      <FounderMessage />
      {/* <MeetOurTeam /> */}
    </>
  );
}
