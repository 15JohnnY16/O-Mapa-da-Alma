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
  title = <>O que você repete não é fraqueza. É um Padrão que ainda <span className="text-primary">não foi nomeado.</span></>,
  description = <>Tem hora que parece que a vida muda por fora, mas por dentro a história é a mesma. <br /> Você <span className="text-foreground">tenta de novo, escolhe diferente, promete que agora vai...</span> e quando vê, está no mesmo ponto.</>,
  pain1 = <>No <span className="text-primary">Amor,</span> muda de pessoa e a sensação se <span className="text-foreground">repete.</span><br />Na <span className="text-primary">Carreira,</span> você até cresce, mas trave sempre no <span className="text-foreground">mesmo ponto.</span><br /> No <span className="text-primary">Dinheiro,</span> você corre atrás... e fica aquela impressão de que <span className="text-foreground">nunca fecha.</span> </>,
  pain2 = <>A <span className="text-primary">Carta da Alma</span> existe para uma missão bem específica. <span className="text-foreground">Pegar o ponto que está mais forte</span> nesta fase da sua vida, dar nome pra ele e mostrar como ele influencia silenciosamente o que você <span className="text-foreground">sente, escolhe e/ou repete.</span></>,
  pain3 = <>E aqui vai a parte <span className="text-foreground">mais importante.</span> <span className="text-primary"> A Carta não é o Mapa completo.</span> Ela <span className="text-foreground">ilumina um ponto central</span> com precisão. <span className="text-primary"> O Mapa abre o desenho inteiro,</span> com todas as áreas e camadas que a Carta não cobre.</>,
  imageSrc = "/Carta-da-Alma/Padrao/pain-carta.avif"
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
              <p className="text-muted-foreground leading-relaxed text-justify">
                {pain1}
              </p>
            </div>

            <div className="bg-card/50 border border-white/5 p-6 rounded-xl">
              <p className="text-muted-foreground leading-relaxed text-justify">
                {pain2}
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl">
              <p className="text-muted-foreground leading-relaxed text-justify">
                {pain3}
              </p>
            </div>
          </div>
        </div>

        {/* Clareza sobre os produtos (destaque tipo citação) */}
        <div className="relative mt-12 max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-card/40 shadow-lg p-8 md:p-12">
          <span className="absolute top-3 left-6 font-serif text-6xl md:text-7xl text-primary/40 leading-none select-none pointer-events-none">
            &ldquo;
          </span>
          <p className="relative font-serif italic text-lg md:text-2xl text-white leading-relaxed pt-6 md:pt-8 pl-4 md:pl-8 text-justify">
            Só pra ficar claro: a{" "}
            <span className="text-primary">Carta</span> é um recorte curto com{" "}
            <span className="text-primary">1 padrão central</span>. O{" "}
            <span className="text-primary">Mapa da Alma</span> é o livro completo, com{" "}
            <span className="text-primary">mais de 40 páginas</span>, pra você se enxergar por inteiro.
          </p>
        </div>

      </div>
    </section>
  );
}