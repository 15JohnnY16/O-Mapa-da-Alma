import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExitPopup from "./components/mapa-da-alma/ExitPopup";

import { LanguageProvider } from "./contexts/LanguageContext";

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
            <Route path="/amostra" element={
              <Index 
                tipo="gratis" 
                publico="adulto" 
                titulo="Receba sua Amostra Gratuita" 
              />
            } />

            {/* 3. ROTA JOVEM VENDA (< 18 Pagante) */}
            {/* Acessa: omapadaalma.com/jovem */}
            <Route path="/jovem" element={
              <Index 
                tipo="venda" 
                publico="jovem" 
                titulo="Mapa da Alma - Edição Jovem" 
              />
            } />

            {/* 4. ROTA JOVEM GRÁTIS (< 18 Lead) */}
            {/* Acessa: omapadaalma.com/jovem-amostra */}
            <Route path="/jovem-amostra" element={
              <Index 
                tipo="gratis" 
                publico="jovem" 
                titulo="Amostra Grátis - Edição Jovem" 
              />
            } />

            {/* Rota de Erro 404 */}
            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  
);

export default App;