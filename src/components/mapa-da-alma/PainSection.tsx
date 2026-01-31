import { RefreshCcw, Lock, Wallet } from "lucide-react";
import { translations as t } from "@/lib/i18n";

const PainSection = () => {

  const painPoints = [
    {
      icon: RefreshCcw ,
      title: t.pain.point1Title,
      description: t.pain.point1Desc,
    },
    {
      icon: Wallet ,
      title: t.pain.point2Title,
      description: t.pain.point2Desc,
    },
    {
      icon: Lock,
      title: t.pain.point3Title,
      description: t.pain.point3Desc,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            {t.pain.headlinePrefix}{" "}
            <span className="text-primary">{t.pain.headlineHighlight}</span>
          </h2>
        </div>

        {/* Story content */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center">
            {t.pain.storyPrefix}{" "}
            <span className="text-foreground font-medium">{t.pain.storyHighlight1}</span>
            {t.pain.storyMiddle}{" "}
            <span className="text-primary font-medium">{t.pain.storyStat}{" "}</span>
            {t.pain.storySuffix}{" "}
            <span className="text-foreground font-medium">{t.pain.storyHighlight2}</span>
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group p-5 md:p-8 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                <point.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl md:text-1xl text-foreground mb-2">{point.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Highlight box */}
        <div className="mt-8 md:mt-16 p-5 md:p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center mx-auto max-w-2xl">
          <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
            {t.pain.highlightPrefix} <span className="text-primary">{t.pain.highlightHighlight1}</span> {t.pain.highlightMiddle}{" "}
            <span className="text-primary"> {t.pain.highlightHighlight2}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainSection;