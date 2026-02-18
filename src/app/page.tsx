import HeroSection from "@/components/sections/HeroSection";
import WhyKlassFin from "@/components/sections/WhyKlassFin";
import HowItWorks from "@/components/sections/HowItWorks";
import PartnersSection from "@/components/sections/PartnersSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import LoanOfferingsSection from "@/components/sections/LoanOfferings";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyKlassFin />
      <HowItWorks />
      <LoanOfferingsSection />
      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
