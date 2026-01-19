import { Battery, Repeat, UserX } from "lucide-react";

const painPoints = [
  {
    icon: Battery,
    title: "Cansaço sem motivo",
    description: "Você acorda exausta mesmo dormindo bem, carregando um peso que não sabe explicar.",
  },
  {
    icon: Repeat,
    title: "Padrões repetitivos",
    description: "Os mesmos problemas voltam: relacionamentos, dinheiro, saúde... como se estivesse presa em um loop.",
  },
  {
    icon: UserX,
    title: "Sensação de não pertencimento",
    description: "Sente que veio de outro lugar, que sua família não te entende, que você não se encaixa.",
  },
];

const PainSection = () => {
  return (
    <section className="py-20 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Você sente que está vivendo um{" "}
            <span className="text-primary">roteiro que não escreveu?</span>
          </h2>
        </div>

        {/* Story content */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            Muitas mulheres sentem um peso invisível. Trabalham muito, mas o dinheiro não fica{" "}
            <span className="text-foreground">(lealdade à escassez)</span>. 
            Cuidam de todos, mas se sentem sozinhas{" "}
            <span className="text-foreground">(lealdade à solidão)</span>. 
            A Astrogenealogia revela que{" "}
            <span className="text-primary font-medium">80% do que você chama de "destino"</span>{" "}
            são, na verdade, memórias ancestrais buscando resolução através de você.
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{point.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Highlight box */}
        <div className="mt-16 p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-lg md:text-xl text-foreground font-medium">
            "E se você pudesse identificar exatamente <span className="text-primary">quais padrões herdou</span> e receber um 
            <span className="text-primary"> roteiro prático</span> para transformá-los?"
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
