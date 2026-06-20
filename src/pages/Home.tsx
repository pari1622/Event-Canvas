import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturedServices from "../components/FeaturedServices";
import HowItWorksSection from "../components/HowItWorksSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturedServices />
      <HowItWorksSection />
      <ContactSection />
    </>
  );
}
