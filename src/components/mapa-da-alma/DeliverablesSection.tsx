import { Flame, Moon, Zap, Clock, Target, Compass } from "lucide-react";
import { translations as t } from "@/lib/i18n";

const DeliverablesSection = () => {

  const deliverables = [
    {
      icon: Flame,
      title: t.deliverables.card1Title,
      description: t.deliverables.card1Desc,
      listItems: [
        {
          highlight: t.deliverables.card1FeatureGradient,
          text: t.deliverables.card1Feature
        },
        {
          highlight: t.deliverables.card1Feature2Gradient,
          text: t.deliverables.card1Feature2
        },
        {
          highlight: t.deliverables.card1Feature3Gradient,
          text: t.deliverables.card1Feature3
        },
        {
          highlight: t.deliverables.card1Feature4Gradient,
          text: t.deliverables.card1Feature4
        }
      ],
    },
    {
      icon: Clock,
      title: t.deliverables.card2Title,
      description: t.deliverables.card2Desc,
      listItems: [
        {
          text: t.deliverables.card2Feature,
          highlight: t.deliverables.card2FeatureGradient,
          reverse: true,
        },
        {
          text: t.deliverables.card2Feature2,
          highlight: t.deliverables.card2Feature2Gradient,
          reverse: true,
        },
        {
          text: t.deliverables.card2Feature3,
          highlight: t.deliverables.card2Feature3Gradient,
          reverse: true,
        },
        {
          text: t.deliverables.card2Feature4,
          highlight: t.deliverables.card2Feature4Gradient,
          reverse: true,
        }
      ],
      featured: true,
    },
    {
      icon: Target,
      title: t.deliverables.card3Title,
      description: t.deliverables.card3Desc,
      listItems: [
        {
          highlight: t.deliverables.card3FeatureGradient,
          text: t.deliverables.card3Feature,
          reverse: true,
        },
        {
          highlight: t.deliverables.card3Feature2Gradient,
          text: t.deliverables.card3Feature2,
        },
        {
          highlight: t.deliverables.card3Feature3Gradient,
          text: t.deliverables.card3Feature3,
          reverse: true,
        },
        {
          highlight: t.deliverables.card3Feature4Gradient,
          text: t.deliverables.card3Feature4,
        }
      ],
    },
    {
      icon: Compass,
      title: t.deliverables.card4Title,
      description: t.deliverables.card4Desc,
      listItems: [
        {
          highlight: t.deliverables.card4FeatureGradient,
          text: t.deliverables.card4Feature,
          reverse: true,
        },
        {
          highlight: t.deliverables.card4Feature2Gradient,
          text: t.deliverables.card4Feature2,
          reverse: true,
          text2: t.deliverables.card4Feature2Middle,
          highlight2: t.deliverables.card4Feature2Gradient2,
        },
        {
          highlight: t.deliverables.card4Feature3Gradient,
          text: t.deliverables.card4Feature3,
          reverse: true,
          text2: t.deliverables.card4Feature3Middle,
          highlight2: t.deliverables.card4Feature3Gradient2,
        },
      ],
    },
  ];

  return (
    <section className="py-16 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 md:px-16 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground">
            {t.deliverables.titlePrefix} <span className="text-primary">{t.deliverables.titleHighlight}</span>
          </h2>
          <br className="hidden md:block" />
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
            <span className="text-primary">{t.deliverables.subtitleGradient}</span> 
            <span className="text-muted-foreground">{t.deliverables.subtitleMiddle}</span>
            <span className="text-foreground">{t.deliverables.subtitleHighlight}</span>
            <span className="text-muted-foreground">{t.deliverables.subtitleMiddle2}</span>
            <span className="text-foreground">{t.deliverables.subtitleHighlight2}</span>
            <span className="text-muted-foreground">{t.deliverables.subtitleSuffix}</span>
            <span className="text-primary">{t.deliverables.subtitleGradient2}</span>
          </p>
        </div>

        {/* Deliverables grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className={`group relative p-5 md:p-8 rounded-2xl border transition-all duration-300 ${item.featured
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
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${item.featured ? "bg-primary/20" : "bg-primary/10"
                  } group-hover:bg-primary/20 transition-colors`}>
                  <item.icon className={`w-6 h-6 md:w-7 md:h-7 ${item.featured ? "text-primary" : "text-primary"}`} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-lg md:text-xl text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  {item.listItems && (
                    <ul className="mt-2 space-y-2 mb-4">
                      {item.listItems.map((point: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          {/* Bolinha dourada */}
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          
                          {/* Lógica Inteligente de Ordem */}
                          <span>
                            {point.reverse ? (
                              // SE TIVER REVERSE: Texto Normal + Destaque (Card 2)
                              <>
                                {point.text}{" "}
                                <span className="text-primary font-medium">{point.highlight}</span>

                                {point.text2}{" "}
                                <span className="text-primary font-medium">{point.highlight2}</span>
                              </>
                            ) : (
                              // PADRÃO: Destaque + Texto Normal (Card 1)
                              <>
                                <span className="text-primary font-medium">{point.highlight}</span>
                                {point.text}
                              </>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 md:mt-10 text-center px-2">
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            <span className="text-foreground">{t.deliverables.summaryPrefix}</span> {" "}
            <span className="text-primary font-semibold">{t.deliverables.summaryMiddle}</span> 
            <span className="text-foreground">{t.deliverables.summaryMiddle2}</span>
            <br className="hidden md:block" />
            <span className="text-primary font-semibold">{t.deliverables.summaryHighlight}</span>{" "}
            {t.deliverables.summarySuffix}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
