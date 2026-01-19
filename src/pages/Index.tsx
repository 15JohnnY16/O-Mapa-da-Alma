import HeroSection from "@/components/mapa-da-alma/HeroSection";
import PainSection from "@/components/mapa-da-alma/PainSection";
import SolutionSection from "@/components/mapa-da-alma/SolutionSection";
import DeliverablesSection from "@/components/mapa-da-alma/DeliverablesSection";
import AuthoritySection from "@/components/mapa-da-alma/AuthoritySection";
import OfferSection from "@/components/mapa-da-alma/OfferSection";
import FormSection from "@/components/mapa-da-alma/FormSection";
import FAQSection from "@/components/mapa-da-alma/FAQSection";
import Footer from "@/components/mapa-da-alma/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PainSection />
      <SolutionSection />
      <DeliverablesSection />
      <AuthoritySection />
      <OfferSection />
      <FormSection />
      <FAQSection />
      <Footer />
    </main>
  );
};

export default Index;
