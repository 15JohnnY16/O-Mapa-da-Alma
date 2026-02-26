import { useEffect, useState } from "react";
import FormSection from "@/components/mapa-da-alma/FormSection";

export default function FormPage() {
  // Estados para controlar como o formulário vai renderizar (com valores padrão)
  const [tipoForm, setTipoForm] = useState<'venda' | 'gratis'>('venda');
  const [publicoForm, setPublicoForm] = useState<'adulto' | 'jovem'>('adulto');
  const [tituloForm, setTituloForm] = useState<string>("Preencha seus dados");

  useEffect(() => {
    // 1. Lê os parâmetros que estão no link do navegador
    const searchParams = new URLSearchParams(window.location.search);
    const urlTipo = searchParams.get("tipo");
    const urlPublico = searchParams.get("publico");

    // 2. Atualiza os estados se os parâmetros existirem e forem válidos
    if (urlTipo === 'gratis' || urlTipo === 'venda') {
      setTipoForm(urlTipo);
    }
    
    if (urlPublico === 'jovem' || urlPublico === 'adulto') {
      setPublicoForm(urlPublico);
    }

    // 3. Define um título inteligente baseado na combinação
    const isVenda = urlTipo !== 'gratis'; // Padrão é venda
    const isJovem = urlPublico === 'jovem';

    if (isVenda && isJovem) setTituloForm("Mapa Astral Jovem Completo");
    else if (isVenda && !isJovem) setTituloForm("Seu Mapa da Alma Completo");
    else if (!isVenda && isJovem) setTituloForm("Amostra Grátis - Jovem");
    else setTituloForm("Sua Amostra Grátis");

  }, []);

  return (
    <div className="min-h-screen bg-navy flex items-start justify-center relative overflow-hidden pt-8 md:pt-12 pb-10">

      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-full bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Container Principal */}
      <div className="max-w-xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* O FormSection recebe as configurações dinâmicas aqui */}
        <FormSection 
          tipo={tipoForm} 
          publico={publicoForm} 
          titulo={tituloForm} 
          compact={true}
        />

        <div className="text-center text-xs text-muted-foreground/60 flex items-center justify-center mt-4">
          Seus dados estão 100% protegidos e nunca serão compartilhados.
        </div>

      </div>

    </div>
  )
}