import { Flame, Moon, Zap, Clock, Target, Compass } from "lucide-react";

const deliverables = [
  {
    icon: Flame,
    title: "Análise dos 3 Guardiões",
    description: "Quíron (sua Ferida Sagrada), Lilith (sua Potência Oculta) e Plutão (seu Portal de Transformação) — os três pontos que a astrologia tradicional ignora.",
    highlight: "Quíron • Lilith • Plutão",
  },
  {
    icon: Clock,
    title: "Cronologia da Alma",
    description: "Seus ciclos de vida exatos, dos 0 aos 90 anos. Saiba quando virão as grandes transformações, oportunidades e momentos de virada.",
    highlight: "0 a 90 anos mapeados",
  },
  {
    icon: Target,
    title: "Roda da Vida Sistêmica",
    description: "Análise detalhada de 12 áreas: Carreira, Amor, Dinheiro, Família, Saúde, Espiritualidade, Criatividade e mais.",
    highlight: "12 áreas da vida",
  },
  {
    icon: Compass,
    title: "Plano de Alquimia de 90 Dias",
    description: "O grande diferencial: um roteiro prático e personalizado para sair da teoria e transformar sua realidade. Ações concretas, passo a passo.",
    highlight: "Roteiro prático",
    featured: true,
  },
];

const DeliverablesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            O Que Você <span className="text-primary">Recebe?</span>
          </h2>
          <br></br>
          <p className="font-serif text-5xl md:text-4xl lg:text-3xl text-foreground">
            <span className="text-primary font-semibold">+40 páginas</span> de análise profunda, escrita {" "} <br></br>
            <span className="text-primary font-semibold">especialmente para você.</span>
          </p>
        </div>

        {/* Deliverables grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className={`group relative p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                item.featured
                  ? "border-primary/50 bg-primary/5 hover:border-primary"
                  : "border-border bg-card/50 hover:border-primary/30"
              }`}
            >
              {/* Featured badge */}
              {item.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  Diferencial Exclusivo
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.featured ? "bg-primary/20" : "bg-primary/10"
                } group-hover:bg-primary/20 transition-colors`}>
                  <item.icon className={`w-7 h-7 ${item.featured ? "text-primary" : "text-primary"}`} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                    item.featured 
                      ? "bg-primary/20 text-primary" 
                      : "bg-secondary text-foreground"
                  }`}>
                    {item.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 text-center">
          <p className="text-lg text-foreground">
            <span className="text-primary font-semibold">+40 páginas</span> de análise profunda,{" "}
            <span className="text-primary font-semibold">escrita à mão</span> especialmente para você.
            Cada elemento foi cuidadosamente desenhado para revelar camadas profundas da sua história.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
