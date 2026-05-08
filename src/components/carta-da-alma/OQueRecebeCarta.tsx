import { Clock, MessageCircle, Target, ListTodo, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OQueRecebeProps {
  scrollToForm: () => void;
}

const benefits = [
  {
    icon: Target,
    title: "Padrões Nomeados com Exatidão",
    desc: <>Você não vai ler descrições genéricas. Você vai ver o seu jeito de funcionar, <span className="text-foreground">onde você se repete,</span> onde se protege demais e onde se sabota sem perceber.</>
  },
  {
    icon: MessageCircle,
    title: "Linguagem Humana (de Verdade)",
    desc: <>Nada de termos que você precise “traduzir”. É <span className="text-foreground">como conversar com alguém que te entende,</span> coloca em palavras o que você sente e te devolve isso com carinho e precisão.</>
  },
  {
    icon: Clock,
    title: "Clareza em até 48 Horas",
    desc: <>Você envia seus dados e em até 48 horas você recebe uma leitura personalizada escrita, <span className="text-foreground">direta ao ponto.</span> Sem enrolação. Só o que importa agora.</>
  },
  {
    icon: ListTodo,
    title: "Um Próximo Passo Prático",
    desc: <>No final, você recebe <span className="text-foreground">um passo simples para aplicar de imediato.</span> Não é gratidão genérica. É um micro-ritual/ação de 7 dias para mudar o que você já reconheceu.</>
  }
];

export default function OQueRecebeCarta({ scrollToForm }: OQueRecebeProps) {
  return (
    <section className="py-16 bg-navy relative">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            O Que Você Recebe na <span className="text-primary">Carta da Alma?</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Uma leitura curta e personalizada do seu mapa natal. <span className="text-foreground">Um ponto central, clareza e um próximo passo.</span> <br /> <span className="text-primary">Sem horóscopo genérico e sem astrologuês.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {benefits.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-5 bg-card border border-primary/10 p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 group hover:bg-card/80">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/10">
                  <item.icon className="w-7 h-7" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- BANNER CTA MODIFICADO (Lilás Harmônico) --- */}
        <div className="relative">
          {/* Efeito de brilho suave atrás */}
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] opacity-50 pointer-events-none" />

          {/* O Box Principal com gradiente lilás suave */}
          <div className="bg-gradient-to-br from-navy-light/90 via-navy-light/60 to-primary/10 border border-primary/20 rounded-3xl p-8 md:p-12 text-center text-foreground shadow-xl relative overflow-hidden backdrop-blur-sm">

            {/* Decoração de fundo sutil */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-navy/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Badge ajustado para cores escuras */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                100% Gratuito
              </div>

              {/* Títulos com cor escura para contraste */}
              <div className="space-y-4">
                <h3 className="font-serif text-3xl md:text-5xl font-bold text-navy-dark leading-tight">
                  Pronta Para se Reconhecer Sem Desculpas?
                </h3>
                <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                  E se a <span className="text-primary">Carta</span> fizer sentido, o próximo passo é o <span className="text-primary">Mapa da Alma.</span> <br /> Porque aí você não vê só um ponto. <span className="text-foreground">Você se enxerga por inteiro.</span>
                </p>
              </div>

              {/* Botão Dourado para destacar no fundo claro */}
              <Button
                onClick={scrollToForm}
                size="lg"
                className="w-full sm:w-auto h-auto min-h-[56px] py-3 px-4 sm:px-10 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full shadow-lg shadow-primary/20 text-base sm:text-lg hover:scale-105 transition-transform flex items-center justify-center whitespace-normal text-center mx-auto"
              >
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Quero minha Carta da Alma</span>
              </Button>

              <p className="text-lx text-muted-foreground/70 mt-2">
                <span className="text-foreground">Entrega em até 48h. Se fizer sentido, no final tem o caminho pro Mapa completo.</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}