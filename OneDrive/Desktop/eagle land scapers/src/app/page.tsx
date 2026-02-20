import HeroCanvas from "@/components/sections/HeroCanvas";
import AboutUs from "@/components/sections/AboutUs";
import GreenInitiatives from "@/components/sections/GreenInitiatives";
import Gallery from "@/components/sections/Gallery";
import OurTeam from "@/components/sections/OurTeam";
import Clients from "@/components/sections/Clients";
import Downloads from "@/components/sections/Downloads";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full">
      <HeroCanvas />
      <AboutUs />
      <GreenInitiatives />
      <Gallery />
      <OurTeam />
      <Clients />
      <Downloads />
      <Contact />
    </main>
  );
}
