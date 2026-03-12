import { RefreshCcw, Lock, Wallet } from "lucide-react";
import { translations as t } from "@/lib/i18n";

const PainSection = () => {

  const painPoints = [
    {
      icon: RefreshCcw,
      title: t.pain.point1Title,
      description: t.pain.point1Desc,
    },
    {
      icon: Wallet,
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
            {t.pain.headlinePrefix}
            <span className="text-primary">{t.pain.headlineHighlight}</span>
          </h2>
        </div>

        {/* Story content - 3 paragraphs */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          {/* Paragraph 1 */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-center">
            {t.pain.storyParagraph1Prefix}
            <span className="text-foreground">{t.pain.storyParagraph1Bold1}</span>
            {t.pain.storyParagraph1Middle}
            <span className="text-foreground">{t.pain.storyParagraph1Bold2}</span>
            {t.pain.storyParagraph1Middle2}
            <span className="text-foreground">{t.pain.storyParagraph1Bold3}</span>
            {t.pain.storyParagraph1Suffix}
          </p>

          {/* Paragraph 2 */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-center">
            {t.pain.storyParagraph2Prefix}
            <span className="text-foreground">{t.pain.storyParagraph2Bold1}</span>
            {t.pain.storyParagraph2Middle}
            <span className="text-foreground">{t.pain.storyParagraph2Bold2}</span>
            {t.pain.storyParagraph2Middle2}
            <span className="text-primary">{t.pain.storyParagraph2Underline}</span>
          </p>

          {/* Paragraph 3 */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-center">
            {t.pain.storyParagraph3Prefix}
            <span className="text-foreground">{t.pain.storyParagraph3Bold1}</span>
            {t.pain.storyParagraph3Middle}
            <span className="text-primary">{t.pain.storyParagraph3Underline}</span>
            {t.pain.storyParagraph3Suffix}
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group p-5 md:p-8 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-300 text-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors mx-auto">
                <point.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl md:text-1xl text-foreground mb-2">{point.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Highlight box - Fechamento */}
        <div className="mt-8 md:mt-16 p-5 md:p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center mx-auto max-w-5xl">
          <p className="text-[17px] md:text-lg text-foreground font-medium leading-relaxed tracking-tight">
            {t.pain.highlightPrefix}
            <span className="text-primary whitespace-nowrap">{t.pain.highlightHighlight1}</span>
            <span className="text-foreground whitespace-nowrap">{t.pain.highlightHighlight1Suffix}</span><br />
            {t.pain.highlightMiddle}
            <span className="text-primary">{t.pain.highlightHighlight2}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainSection;