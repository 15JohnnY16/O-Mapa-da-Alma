import { CheckCircle2, ShieldCheck, Lock, BatteryWarning, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ParaQuemEItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
}

interface ParaQuemEProps {
  scrollToForm: () => void;
  title?: React.ReactNode;
  subtitle?: string;
  items?: ParaQuemEItem[]; // Se passar itens, usa eles. Se não, usa o padrão.
}

// Padrão (Amor, Carreira, Dinheiro)
const defaultItems = [
  {
    icon: RefreshCcw,
    title: "Repete Ciclos em Relacionamentos",
    desc: "Você atrai sempre o mesmo tipo de pessoa indisponível e quer entender por que continua escolhendo quem te machuca.",
    color: "text-red-400",
    bg: "bg-red-400/10"
  },
  {
    icon: Lock,
    title: "Trava Na Carreira ou no Dinheiro",
    desc: "Você chega perto de crescer e sabota no último momento, ou ganha dinheiro mas nunca consegue segurar.",
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  },
  {
    icon: BatteryWarning,
    title: "Está Cansada de Carregar Tudo Sozinha",
    desc: "Você resolve, cuida, segura as pontas para todo mundo mas ninguém cuida de você e já não aguenta mais.",
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  }
];

export default function ParaQuemE({ 
  scrollToForm, 
  title = <>A Carta da Alma É <span className="text-primary">Para Você Que...</span></>,
  subtitle = "Está cansada de repetir os mesmos ciclos e quer clareza real sobre por que isso acontece.",
  items = defaultItems
}: ParaQuemEProps) {
  return (
    <section className="py-20 md:py-28 bg-navy-light relative overflow-hidden">
      {/* Background Decorativo suave */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header da Seção */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            Para Quem É
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Grid de Cards (Problemas) */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {items.map((item, index) => (
            <div key={index} className="bg-card/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 shadow-lg group">
              
              {/* Ícone com brilho */}
              <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              
              <h3 className="font-serif text-xl text-foreground mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Area - Botão Ajeitado + Elementos Ideais */}
        <div className="flex flex-col items-center gap-6 animate-in slide-in-from-bottom duration-700 delay-300">
          
          {/* O BOTÃO PREMIUM (Gold Glow) */}
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="relative group bg-gradient-to-r from-yellow-500 via-primary to-yellow-600 hover:from-yellow-400 hover:via-primary/90 hover:to-yellow-500 text-navy-dark font-bold h-14 px-12 rounded-full shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.7)] transition-all duration-300 scale-100 hover:scale-105 w-full md:w-auto text-lg border-2 border-yellow-300/30 overflow-hidden"
          >
               Quero Minha Carta Grátis
            {/* Efeito de brilho passando */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine" />
          </Button>

          {/* ELEMENTOS IDEAIS (Micro-copy de segurança abaixo do botão) */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground opacity-80">
             <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Entrega garantida em até 48 horas</span>
             </div>
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% gratuito • Sem compromisso</span>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}