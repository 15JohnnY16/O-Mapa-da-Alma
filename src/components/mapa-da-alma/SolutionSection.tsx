import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Map, Clock } from "lucide-react";
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">{t.solution.badge}</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t.solution.headlinePrefix}{" "}
            <span className="text-gradient-gold">{t.solution.headlineGradient}</span>
          </h2>

          <p className="text-xl text-primary font-medium">
            {t.solution.subheadline}
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.solution.descriptionPrefix}{" "}
              <span className="text-foreground font-medium">{t.solution.descriptionHighlight}</span>{" "}
              {t.solution.descriptionSuffix}
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>
                <div>
                  <span className="text-foreground font-medium">{t.solution.feature1Title}</span>
                  <p className="text-sm text-muted-foreground">{t.solution.feature1Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>
                <div>
                  <span className="text-foreground font-medium">{t.solution.feature2Title}</span>
                  <p className="text-sm text-muted-foreground">{t.solution.feature2Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>
                <div>
                  <span className="text-foreground font-medium">{t.solution.feature3Title}</span>
                  <p className="text-sm text-muted-foreground">{t.solution.feature3Desc}</p>
                </div>
              </li>
            </ul>

            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-foreground font-medium italic">
                {t.solution.quote}
              </p>
            </div>
          </div>

          {/* Right: Visual representation */}
          <div className="relative flex flex-col items-center">
            {/* Animated Chart Container */}
            <div className="relative w-full aspect-square max-w-[500px] mx-auto pointer-events-none select-none mb-8">
              <img src="/chart-layer-1.webp" alt="Birth Chart Layer 1" className="w-full h-full absolute top-0 left-0 animate-animatedchartlayer1 opacity-40" loading="lazy" />
              <img src="/chart-layer-2.webp" alt="Birth Chart Layer 2" className="w-full h-full absolute top-0 left-0 animate-animatedchartlayer2 mix-blend-screen opacity-70" loading="lazy" />
              <img src="/chart-layer-3.webp" alt="Birth Chart Layer 3" className="w-full h-full absolute top-0 left-0 animate-animatedchartlayer3 mix-blend-overlay opacity-70" loading="lazy" />
            </div>

            {/* CTA Button */}
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300"
            >
              {t.hero.ctaButton}
            </Button>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/5 blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default SolutionSection;
