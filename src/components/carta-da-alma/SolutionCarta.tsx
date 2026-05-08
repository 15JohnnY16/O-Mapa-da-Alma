import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SolutionCartaProps {
  scrollToForm: () => void;
  badge?: ReactNode;
  title?: ReactNode;
  text1?: ReactNode;
  boxHighlight?: ReactNode;
  text2?: ReactNode;
  ctaText?: ReactNode;
  imageSrc?: string;
  bottomHighlight?: ReactNode;
}

export default function SolutionCarta({
  scrollToForm,
  // TEXTOS PADRÃO (GERAIS PARA A ROTA PRINCIPAL)
  badge = "Um Recorte do Seu Mapa",
  title = <>A Clareza Que <span className="text-primary">Destrava o Primeiro Nó</span></>,
  text1 = <>A <span className="text-primary">Carta</span> não foi feita pra te deixar <span className="text-foreground">"motivada".</span> Ela foi feita para te deixar <span className="text-foreground">lúcida, </span> de um jeito simples e direto.</>,
  boxHighlight = (
    <>
      <strong className="text-primary mb-2 flex items-center">
        A Carta da Alma revela o seu padrão central.
      </strong>
      Ela mostra o que está mais latente no seu mapa, porque isso <span className="text-foreground">ganha força agora</span> e qual é o próximo passo mais simples <span className="text-primary">para lidar com isso</span> de um jeito diferente.
    </>
  ),
  text2 = <><span className="text-foreground">Sem astrologuês. Sem horóscopo genérico.</span> É um recorte. Um ponto central. <span className="text-primary">Só que certeiro!</span></>,
  ctaText = <>Quero Minha Carta Agora</>,
  imageSrc = "/Carta-da-Alma/Padrao/solution-carta.png",
  bottomHighlight = (
    <>
      Quando você enxerga o padrão, <span className="text-foreground">você para de brigar consigo mesma.</span><br />E começa a fazer escolhas com mais consciência.<br /><span className="text-foreground">A mudança começa quando a clareza vira ação.</span>
    </>
  )
}: SolutionCartaProps) {

  return (
    <section className="py-8 md:py-10 bg-navy-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* Título Centralizado com Badge */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6 bg-primary/5">
            {badge}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            {title}
          </h2>
        </div>

        {/* Grid Principal */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* Coluna da Esquerda */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {text1}
            </p>

            {/* Box de Destaque */}
            <div className="bg-card border border-primary/20 p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden group hover:border-primary/40 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
              <div className="relative z-10 text-muted-foreground leading-relaxed text-base md:text-lg">
                {boxHighlight}
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {text2}
            </p>

            <div className="pt-2">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-14 px-8 rounded-full shadow-lg shadow-primary/20 text-base md:text-lg w-full md:w-full transition-transform hover:scale-105"
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Coluna da Direita (Imagem) - CORRIGIDA */}
          <div className="relative w-full md:w-4/5 md:mx-auto aspect-square md:aspect-[4/5] group animate-in slide-in-from-right duration-700 delay-200 group">
            {/* Moldura decorativa */}
            <div className="absolute top-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl hidden md:block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-card">
              <img
                src={imageSrc}
                alt="Clareza da Carta da Alma"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/20 mix-blend-multiply pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Box Largo Inferior */}
        <div className="relative mt-12 animate-in slide-in-from-bottom duration-700 delay-300">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-navy rounded-2xl blur opacity-30" />
          <div className="relative bg-gradient-to-br from-card to-navy border border-primary/20 rounded-2xl p-6 md:p-4 text-center md:text-left shadow-2xl">
            <p className="justify-center text-center md:text-xl text-muted-foreground leading-relaxed">
              {bottomHighlight}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}