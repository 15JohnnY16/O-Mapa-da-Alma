import { Button } from "@/components/ui/button";
import { translations as t } from "@/lib/i18n";

const SolutionSection = () => {

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 constellation-pattern opacity-30" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">{t.solution.badge}</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t.solution.headlinePrefix}
            <span className="text-primary">{t.solution.headlineGradient}</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div className="space-y-6 text-center">
            {/* Paragraph 1 */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              <span className="text-primary">{t.solution.paragraph1Prefix}</span>
              {t.solution.paragraph1Primary}
              <span className="text-foreground">{t.solution.paragraph1Middle}</span>
              {t.solution.paragraph1Suffix}
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              {t.solution.paragraph2Prefix}
              <span className="text-foreground">{t.solution.paragraph2Bold}</span>
              {t.solution.paragraph2Middle}
              <span className="text-primary">{t.solution.paragraph2Primary}</span>
            </p>

            {/* Paragraph 3 */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              {t.solution.paragraph3Prefix}
              <span className="text-foreground">{t.solution.paragraph3Bold}</span>
              {t.solution.paragraph3Middle}
              <span className="text-primary">{t.solution.paragraph3Primary}</span>
            </p>

            {/* Quote box */}
            <div className="bg-card border border-primary/20 rounded-xl p-4 md:p-6 text-center relative overflow-hidden">
              <p className="text-foreground font-medium italic text-sm md:text-lg relative z-10">
                {t.solution.quote}
              </p>
            </div>
          </div>

          {/* Right: Mandala */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[260px] md:max-w-[400px] mx-auto pointer-events-none select-none">
              <img src="/chart-layer-1.webp" alt="Birth Chart Layer 1" className="w-full h-full absolute top-0 left-0 animate-animatedchartlayer1 opacity-40" loading="lazy" />
              <img src="/chart-layer-2.webp" alt="Birth Chart Layer 2" className="w-full h-full absolute top-0 left-0 animate-animatedchartlayer2 mix-blend-screen opacity-70" loading="lazy" />
              <img src="/chart-layer-3.webp" alt="Birth Chart Layer 3" className="w-full h-full absolute top-0 left-0 animate-animatedchartlayer3 mix-blend-overlay opacity-70" loading="lazy" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/5 blur-3xl -z-10" />
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pt-12">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="text-xl px-20 py-8 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300"
          >
            {t.solution.ctaButton}
          </Button>
        </div>
      </div>
    </section>
  );
};
export default SolutionSection;
