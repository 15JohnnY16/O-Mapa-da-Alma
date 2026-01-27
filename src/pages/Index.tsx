import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/mapa-da-alma/HeroSection";
import PainSection from "@/components/mapa-da-alma/PainSection";
import SolutionSection from "@/components/mapa-da-alma/SolutionSection";
import DeliverablesSection from "@/components/mapa-da-alma/DeliverablesSection";
import AuthoritySection from "@/components/mapa-da-alma/AuthoritySection";
import OfferSection from "@/components/mapa-da-alma/OfferSection";
import FormSection from "@/components/mapa-da-alma/FormSection";
import FAQSection from "@/components/mapa-da-alma/FAQSection";
import Footer from "@/components/mapa-da-alma/Footer";

// Definimos o que essa página aceita receber do Roteador (App.tsx)
interface IndexProps {
  tipo?: 'venda' | 'gratis';
  publico?: 'adulto' | 'jovem';
  titulo?: string;
}

// Recebemos as props aqui com valores padrão (caso acesse a raiz sem nada)
const Index = ({ tipo = 'venda', publico = 'adulto', titulo }: IndexProps) => {
  const location = useLocation();

  // 👇 AQUI ESTÁ A MÁGICA DA ROLAGEM AUTOMÁTICA
  useEffect(() => {
    // Se a URL tiver um # (ex: /amostra#formulario)
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Espera 100ms para garantir que a página carregou antes de rolar
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]); // Executa toda vez que a URL muda

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PainSection />
      <SolutionSection />
      <DeliverablesSection />
      <AuthoritySection />

      {/* Só mostra a seção de preço (R$ 197) se for VENDA. Se for grátis, some. */}
      {tipo === 'venda' && <OfferSection />}
      
      {/* Repassamos as configurações para o formulário */}
      <FormSection tipo={tipo} publico={publico} titulo={titulo} />
      
      <FAQSection />
      <Footer />
    </main>
  );
};

export default Index;