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
  badge = "A Solução",
  title = <>A Clareza Que <span className="text-primary">Quebra Seus Ciclos</span></>,
  text1 = "Existe uma maneira de parar de repetir as mesmas histórias em relacionamentos, carreira e finanças sem precisar se culpar. Sem forçar uma mudança superficial. Sem fingir que basta 'querer muito' para conseguir alterar sua realidade.",
  boxHighlight = (
    <>
      <strong className="text-primary mb-2 flex items-center">
        A Carta da Alma revela a raiz exata das suas repetições.
      </strong>
      Ela nomeia a lealdade invisível que você carrega, mostra de onde ela vem, e te entrega o próximo passo concreto para começar a escolher diferente.
    </>
  ),
  text2 = "Sem jargão técnico. Sem invenção. Só reconhecimento que arrepia porque finalmente alguém colocou em palavras o que você sempre sentiu mas nunca conseguiu explicar.",
  ctaText = "Receber Minha Clareza Agora",
  imageSrc = "/solution-carta.png",
  bottomHighlight = (
    <>
      Quando você entende que o problema não é você, mas o que você herdou, <strong className="text-white">tudo muda</strong>. Você para de se culpar. Para de achar que tem "dedo podre" ou falta de sorte. E começa a agir com confiança real. Porque agora você sabe: <strong className="text-primary">a mudança começa com a consciência.</strong>
    </>
  )
}: SolutionCartaProps) {
  
  return (
    <section className="py-20 md:py-28 bg-navy-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Título Centralizado com Badge */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-6 bg-primary/5">
            {badge}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            {title}
          </h2>
          <div className="w-24 h-1.5 bg-primary/30 rounded-full mt-6" />
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
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-14 px-8 rounded-full shadow-lg shadow-primary/20 text-base md:text-lg w-full md:w-auto transition-transform hover:scale-105"
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
            <div className="relative bg-gradient-to-br from-card to-navy border border-primary/20 rounded-2xl p-8 md:p-8 text-center md:text-left shadow-2xl">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {bottomHighlight}
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}