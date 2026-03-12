import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface HeroCartaProps {
  scrollToForm: () => void;
  badge?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  imageSrc?: string;
}

export default function HeroCarta({
  scrollToForm,
  badge = "Entrega em até 48 horas",
  title = <>A <span className="text-gradient-gold">Carta da Alma</span> coloca em palavras o que você <span className="text-primary">sente.</span></>,
  subtitle = <>A <span className="text-primary">Carta da Alma</span> é um recorte do seu <span className="text-primary">mapa natal, </span>escrito como uma amiga sincera. <span className="text-foreground">Sem astrologuês,</span> ela te mostra um <span className="text-primary">ponto central</span> que fica mais forte nesta fase da <span className="text-foreground">sua vida,</span> te entrega <span className="text-primary">clareza</span> e um próximo passo simple.</>,
  imageSrc = "/Carta-da-Alma/Padrao/hero-carta.jfif"
}: HeroCartaProps) {
  return (
    <section className="relative pt-12 pb-16 md:pt-24 md:pb-32 overflow-hidden bg-navy-light">
      <div className="absolute inset-0 constellation-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* VOLTEI PARA items-center: Alinha o texto ao centro verticalmente da imagem */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* === COLUNA 1: TEXTO === */}
          <div className="space-y-6 text-center md:text-left animate-in slide-in-from-bottom-10 duration-700">
            {/* ... Conteúdo do texto (sem alterações) ... */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mx-auto md:mx-36 shadow-lg shadow-primary/5">
              <span className="text-sm font-medium text-primary">{badge}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-center">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/25 text-primary tracking-wide">
                Não é mapa astral comum
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/25 text-primary tracking-wide">
                Não é texto genérico
              </span>
            </div>

            <div className="pt-1 flex flex-col sm:flex-row gap-4 justify-center md:justify-center">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-14 px-16 rounded-full shadow-lg shadow-primary/20 text-base md:text-lg w-full md:w-auto transition-transform hover:scale-105"
              >
                Quero Minha Carta Grátis
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 bg-card/50 px-3 py-1 rounded-lg border border-primary/10">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>100% Grátis</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/50 px-3 py-1 rounded-lg border border-primary/10">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Personalizada</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card/50 px-3 py-1 rounded-lg border border-primary/10">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Impacto Profundo</span>
              </div>
            </div>
          </div>


          {/* === COLUNA 2: IMAGEM (AJUSTADA) === */}
          <div className="relative hidden md:block group animate-in zoom-in duration-1000 delay-200 my-auto">

            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

            {/* AQUI ESTÁ A MÁGICA: aspect-[3/4] */}
            {/* Isso força o container a ter sempre uma proporção de retrato elegante, não importa o conteúdo */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-primary/20 shadow-2xl bg-card/50 backdrop-blur-sm">

              <img
                src={imageSrc}
                alt="Tema da Carta"
                // object-cover e object-top garantem que a imagem 9:16 preencha esse espaço 3:4 focando no topo (rosto)
                className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-90 pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 bg-card/90 backdrop-blur-md p-5 rounded-xl border border-primary/20 shadow-lg z-20">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-base font-bold text-foreground">Reconhecimento Imediato</p>
                    <p className="text-sm text-muted-foreground">Você recebe uma leitura curta, direta e feita pra você.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}