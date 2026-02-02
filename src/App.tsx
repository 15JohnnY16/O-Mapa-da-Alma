import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExitPopup from "./components/mapa-da-alma/ExitPopup";

import { LanguageProvider } from "./contexts/LanguageContext";
import ThankYouPage from "./pages/ThankYouPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ExitPopup />
          <Routes>
            
            {/* 1. ROTA PRINCIPAL (Adulto Venda) */}
            {/* Acessa: omapadaalma.com/ */}
            <Route path="/" element={
              <Index 
                tipo="venda" 
                publico="adulto" 
              />
            } />

            {/* 2. ROTA AMOSTRA GRÁTIS (Adulto Lead) */}
            {/* Acessa: omapadaalma.com/amostra */}
            <Route path="/carta" element={
              <Index 
                tipo="gratis" 
                publico="adulto" 
                titulo="Receba a sua Carta da Alma" 
              />
            } />

            {/* 3. ROTA JOVEM VENDA (< 18 Pagante) */}
            {/* Acessa: omapadaalma.com/jovem */}
            <Route path="/jovem-venda" element={
              <Index 
                tipo="venda" 
                publico="jovem" 
                titulo="Mapa da Alma - Edição Jovem" 
              />
            } />

            {/* 4. ROTA JOVEM GRÁTIS (< 18 Lead) */}
            {/* Acessa: omapadaalma.com/jovem-amostra */}
            <Route path="/jovem-carta" element={
              <Index 
                tipo="gratis" 
                publico="jovem" 
                titulo="Carta da Alma - Edição Jovem" 
              />
            } />

            {/* 5. ROTA OBRIGADO */}
            {/* Acessa: omapadaalma.com/obrigado */}
            <Route path="/obrigado" element={<ThankYouPage />} />

            {/* Rota de Erro 404 */}
            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  
);

export default App;