import { Flame, Moon, Zap, Clock, Target, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DeliverablesSection = () => {
  const { t } = useLanguage();

  const deliverables = [
    {
      icon: Flame,
      title: t.deliverables.card1Title,
      description: t.deliverables.card1Desc,
      highlight: t.deliverables.card1Highlight,
    },
    {
      icon: Clock,
      title: t.deliverables.card2Title,
      description: t.deliverables.card2Desc,
      highlight: t.deliverables.card2Highlight,
    },
    {
      icon: Target,
      title: t.deliverables.card3Title,
      description: t.deliverables.card3Desc,
      highlight: t.deliverables.card3Highlight,
    },
    {
      icon: Compass,
      title: t.deliverables.card4Title,
      description: t.deliverables.card4Desc,
      highlight: t.deliverables.card4Highlight,
      featured: true,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t.deliverables.titlePrefix} <span className="text-primary">{t.deliverables.titleHighlight}</span>
          </h2>
          <br></br>
          <p className="font-serif text-5xl md:text-4xl lg:text-3xl text-foreground">
            <span className="text-primary font-semibold">{t.deliverables.subtitlePrefix}</span> {t.deliverables.subtitleSuffix} {" "} <br></br>
            <span className="text-primary font-semibold">{t.deliverables.subtitleHighlight}</span>
          </p>
        </div>

        {/* Deliverables grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className={`group relative p-6 md:p-8 rounded-2xl border transition-all duration-300 ${item.featured
                  ? "border-primary/50 bg-primary/5 hover:border-primary"
                  : "border-border bg-card/50 hover:border-primary/30"
                }`}
            >
              {/* Featured badge */}
              {item.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {t.deliverables.featuredBadge}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${item.featured ? "bg-primary/20" : "bg-primary/10"
                  } group-hover:bg-primary/20 transition-colors`}>
                  <item.icon className={`w-7 h-7 ${item.featured ? "text-primary" : "text-primary"}`} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${item.featured
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
            <span className="text-primary font-semibold">{t.deliverables.summaryPrefix}</span> {t.deliverables.summaryMiddle}{" "}
            <span className="text-primary font-semibold">{t.deliverables.summaryHighlight}</span>{" "}
            {t.deliverables.summarySuffix}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
