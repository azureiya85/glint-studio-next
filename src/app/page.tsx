import HeroSection from "@/components/templates/herosec.modules";
import CondensedOverview from "@/components/templates/conover.modules";
import ServiceSection from "@/components/templates/servicesection.modules";

export const metadata = {
  title: "Home | glint studio",
  description: "Welcome to glint studio",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CondensedOverview />
      <ServiceSection />
      {/* <TestimonialList /> */}
      {/* <FooterMain /> */}
    </>
  );
}
