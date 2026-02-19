import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface PainCartaProps {
  title?: ReactNode;
  description?: ReactNode;
  pain1?: ReactNode;
  pain2?: ReactNode;
  pain3?: ReactNode;
  imageSrc?: string;
}

export default function PainCarta({ 
  title = <>O Que Você Repete <span className="text-primary">Não é Falha Sua</span>.<br />É Lealdade Invisível.</>,
  description = <>Você já percebeu que escolhe sempre o mesmo tipo de pessoa em relacionamentos? Que trava nos mesmos pontos na carreira? Que o dinheiro escorre pelos dedos do mesmo jeito, sempre?</>,
  pain1 = <>E você já tentou mudar. Fez terapia. Leu livros. Prometeu para si mesma que dessa vez seria diferente. Mas três meses depois, está vivendo a mesma história com outro nome.</>,
  pain2 = <>Não é porque você não se esforça. <strong className="text-foreground">É porque você carrega padrões que não são seus.</strong></>,
  pain3 = <>São lealdades invisíveis herdadas da sua árvore genealógica. Dinâmicas familiares que você repete como se fossem escolhas pessoais. <strong className="text-primary block mt-2">Você não falhou. Você só não sabia que estava carregando histórias que nunca foram suas.</strong></>,
  imageSrc = "/pain-carta.avif"
}: PainCartaProps) {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Título Central */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
            {title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagem / Ilustração */}
          <div className="relative w-full md:w-4/5 md:mx-auto aspect-square md:aspect-[4/5] group">
            <div className="absolute -inset-2 bg-primary/10 rounded-2xl rotate-2"></div>
            <div className="h-full w-full rounded-2xl overflow-hidden border border-primary/20 shadow-2xl relative bg-navy-light">
               <img 
                  src={imageSrc}
                  alt="Ilustração da dor"
                  className="w-full h-full object-cover object-center opacity-80"
               />
               <div className="absolute inset-0 bg-navy/20"></div>
            </div>
          </div>

          {/* Textos Laterais (Boxes) */}
          <div className="space-y-6">
            <div className="bg-card border-l-4 border-primary p-6 rounded-r-xl shadow-lg">
              <p className="text-muted-foreground leading-relaxed">
                {pain1}
              </p>
            </div>

            <div className="bg-card/50 border border-white/5 p-6 rounded-xl">
              <p className="text-muted-foreground leading-relaxed">
                {pain2}
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl">
              <p className="text-muted-foreground leading-relaxed">
                {pain3}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}