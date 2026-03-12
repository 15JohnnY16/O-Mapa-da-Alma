import { FileText, Search, Heart, MousePointerClick, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "1. Você Envia Seus Dados",
    desc: "Preenche um formulário rápido com data, hora e cidade de nascimento. Só isso."
  },
  {
    icon: Search,
    title: "2. Eu Faço a Leitura do Seu Mapa",
    desc: "Eu analiso um ponto central do seu mapa natal e traduzo em linguagem humana, pra te entregar clareza rápida e um próximo passo aplicável."
  },
  {
    icon: Heart,
    title: "3. Você se Reconhece",
    desc: "Você recebe a Carta por e-mail e/ou WhatsApp. Uma Leitura leve, precisa e com aquela sensação de “uau, sou eu”."
  },
  {
    icon: MousePointerClick,
    title: "4. Você Escolhe o Próximo Passo",
    desc: "Se a Carta fizer sentido, o próximo passo é o Mapa da Alma. Porque aí você não vê só um ponto. Você se enxerga por inteiro, com mais clareza pra agir."
  }
];

export default function ComoFuncionaCarta() {
  return (
    <section className="py-20 md:py-28 bg-navy relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
            Passo a Passo Simples
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Como Funciona a <span className="text-primary">Carta da Alma</span>?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Um processo simples em 4 etapas feito pra te dar clareza real sobre você, sem enrolação.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Linha conectora (apenas desktop, entre cards) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-gradient-to-r from-primary/30 to-transparent -z-10 opacity-50" />
              )}
              
              <div className="bg-card border border-primary/10 rounded-2xl p-6 h-full hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/5">
                {/* Número do Passo */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-navy border border-primary text-primary flex items-center justify-center text-sm font-bold shadow-md">
                  {index + 1}
                </div>

                {/* Ícone */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <step.icon className="w-7 h-7" />
                </div>

                <h3 className="font-serif text-xl text-foreground mb-3 leading-tight">
                  {step.title.split(". ")[1]} {/* Remove o número do título pois já temos a bolinha */}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Callout */}
        <div className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 text-sm md:text-base text-primary/80 bg-primary/5 px-6 py-3 rounded-lg border border-primary/10">
                <span className="text-foreground font-semibold">Não é Horóscopo. Não é Previsão. É leitura de Padrão e Comportamento.</span>
            </p>
        </div>

      </div>
    </section>
  );
}