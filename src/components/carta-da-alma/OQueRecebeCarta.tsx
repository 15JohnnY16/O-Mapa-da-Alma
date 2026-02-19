import { Clock, MessageCircle, Target, ListTodo, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OQueRecebeProps {
  scrollToForm: () => void;
}

const benefits = [
  {
    icon: Clock,
    title: "Reconhecimento Imediato em até 48 Horas",
    desc: "Você envia seus dados e recebe uma leitura escrita tão precisa que você se reconhece na hora. Sem esperar semanas. Clareza rápida para quem precisa de resposta agora."
  },
  {
    icon: MessageCircle,
    title: "Linguagem Humana, Sem Jargão Técnico",
    desc: "Nada de quadratura ou termos que você precisa pesquisar. A Carta é escrita como se uma amiga sábia estivesse te contando a verdade sobre você com ternura."
  },
  {
    icon: Target,
    title: "Padrões Nomeados com Exatidão",
    desc: "Você descobre exatamente qual padrão te trava. Não é descrição genérica de horóscopo. É um espelho emocional que mostra onde você se sabota."
  },
  {
    icon: ListTodo,
    title: "Próximo Passo Prático Incluído",
    desc: "No final da Carta, você recebe um ritual simples de 7 dias para ancorar a leitura. Não é gratidão genérica. É um exercício prático que revela onde você se sabota."
  }
];

export default function OQueRecebeCarta({ scrollToForm }: OQueRecebeProps) {
  return (
    <section className="py-20 bg-navy relative">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            O Que Você Recebe na <span className="text-primary">Carta da Alma</span>?
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Uma experiência completa de autoconhecimento que vai além de um mapa técnico.
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
                <Sparkles className="w-4 h-4" /> 100% Gratuito
                </div>
                
                {/* Títulos com cor escura para contraste */}
                <div className="space-y-4">
                    <h3 className="font-serif text-3xl md:text-5xl font-bold text-navy-dark leading-tight">
                        Pronta Para Parar de Repetir?
                    </h3>
                    <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                        Receba sua Carta da Alma personalizada em até 48 horas. Sem custo. Sem compromisso. <br />Só reconhecimento real.
                    </p>
                </div>

                {/* Botão Dourado para destacar no fundo claro */}
                <Button 
                onClick={scrollToForm}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-14 px-10 rounded-full shadow-lg shadow-primary/20 text-lg hover:scale-105 transition-transform"
                >
                <Mail className="w-5 h-5 mr-2" />
                Solicitar Minha Carta Agora
                </Button>
            </div>
            </div>
        </div>

      </div>
    </section>
  );
}