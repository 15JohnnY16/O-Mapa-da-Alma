import { Battery, Repeat, UserX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PainSection = () => {
  const { t } = useLanguage();

  const painPoints = [
    {
      icon: Battery,
      title: t.pain.point1Title,
      description: t.pain.point1Desc,
    },
    {
      icon: Repeat,
      title: t.pain.point2Title,
      description: t.pain.point2Desc,
    },
    {
      icon: UserX,
      title: t.pain.point3Title,
      description: t.pain.point3Desc,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t.pain.headlinePrefix}{" "}
            <span className="text-primary">{t.pain.headlineHighlight}</span>
          </h2>
        </div>

        {/* Story content */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            {t.pain.storyPrefix}{" "}
            <span className="text-foreground">{t.pain.storyHighlight1}</span>
            {t.pain.storyMiddle}{" "}
            <span className="text-foreground">{t.pain.storyHighlight2}</span>
            {t.pain.storySuffix}{" "}
            <span className="text-primary font-medium">{t.pain.storyStat}</span>{" "}
            {t.pain.storyEnd}
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
            {t.pain.highlightPrefix} <span className="text-primary">{t.pain.highlightHighlight1}</span> {t.pain.highlightMiddle}{" "}
            <span className="text-primary"> {t.pain.highlightHighlight2}</span> {t.pain.highlightSuffix}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
