import { Check, FileText, Map as MapIcon, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PanoramaProps {
  scrollToFormCarta: () => void;
  // Função para redirecionar para a página de vendas do Mapa completo
  navigateToMapa: () => void; 
}

export default function PanoramaCarta({ scrollToFormCarta, navigateToMapa }: PanoramaProps) {
  
  const beneficiosCarta = [
    "Um padrão central que se repete;",
    "Uma causa provável por trás disso;",
    "Como isso aparece nas suas atitudes e escolhas;",
    "Um próximo passo pequeno possível, pra começar a mudar;",
    "Possui em média 2 páginas;",
    "É um pocket Grátis;",
    "Entrega em até 48h."
  ];

  const beneficiosMapa = [
    "O desenho completo da sua vida, o que te trouxe até aqui e como poderá ser adiante;",
    "As raízes por trás de vários padrões, e como eles se conectam entre si;",
    <>Uma leitura personalizada por áreas da sua vida, como <strong>Amor, Carreira, Dinheiro, Família, Identidade, Propósito...</strong>;</>,
    "Um guia de próximos passos em camadas, pra você saber o que fazer agora, no próximo mês e no próximo ciclo;",
    "Mais contexto, mais clareza e mais direção, sem ficar só na teoria;",
    "Possui mais de 40 páginas sobre você. É como se fosse um espelho.",
    "É um material completo e aprofundado;",
    "É pago;",
    "Entrega em até 5 dias úteis."
  ];

  return (
    <section className="py-16 bg-navy relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-full bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <> Entenda a Diferença </>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
            <span className="text-primary">Carta</span> e <span className="text-primary">Mapa</span> são produtos diferentes.
          </h2>
        </div>

        {/* Grid de Comparação - ALINHADO */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch mb-12">
          
          {/* CARD 1: CARTA (Grátis) */}
          <div className="flex flex-col bg-card/50 backdrop-blur-sm border border-primary/20 p-6 md:p-8 rounded-3xl shadow-xl hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-foreground">
                O que a <span className="text-primary font-bold">Carta</span> te entrega?
              </h3>
            </div>
            
            <ul className="space-y-3.5 mb-8 flex-1">
              {beneficiosCarta.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={scrollToFormCarta}
              variant="outline"
              size="lg"
              className="w-full h-12 text-sm border-primary/30 text-foreground hover:bg-primary/10 rounded-full"
            >
              Quero minha Carta Grátis
            </Button>
          </div>

          {/* CARD 2: MAPA (Pago / Premium) - AGORA ALINHADO */}
          <div className="relative flex flex-col bg-gradient-to-br from-navy-light/90 via-navy-light/80 to-primary/10 backdrop-blur-md border border-primary/30 p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(201,162,39,0.08)] hover:scale-[1.01] transition-transform duration-300">
            
            {/* Badge de Destaque Opcional */}
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-lg">
              A Experiência Completa
            </div>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-lg shadow-primary/20">
                <MapIcon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-foreground">
                O que o <span className="text-primary font-bold">Mapa</span> entrega?
              </h3>
            </div>
            
            <ul className="space-y-3.5 mb-8 flex-1">
              {beneficiosMapa.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-gray-200 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Button 
              onClick={navigateToMapa}
              size="lg"
              className="w-full h-12 text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-full glow-gold"
            >
              Quero meu Mapa Completo <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

        </div>

        {/* Rodapé da Seção */}
        <div className="text-center max-w-2xl mx-auto bg-primary/5 border border-primary/10 p-5 rounded-2xl backdrop-blur-sm">
          <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
            Se você quer o panorama inteiro, o <strong className="text-primary font-serif">Mapa</strong> é o caminho. <br className="hidden md:block" />
            Se você quer começar com clareza, a <strong className="text-primary font-serif">Carta</strong> é perfeita.
          </p>
        </div>

      </div>
    </section>
  );
}