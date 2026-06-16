import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { translations as t } from "@/lib/i18n";

const HeroSection = () => {

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      {/* Background with constellation pattern */}
      <div className="absolute inset-0 bg-background constellation-pattern" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Decorative compass element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Compass className="w-[600px] h-[600px] text-primary" strokeWidth={0.5} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Grid 12 colunas. Mobile: título → imagem → resto (via row-start). Desktop: texto à esquerda, imagem à direita. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center mt-12 lg:mt-0">

          {/* Bloco 1: Badge + Headline (topo esquerdo no desktop, 1º no mobile) */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 flex flex-col justify-end space-y-6 lg:space-y-9 animate-fade-in text-center mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mx-auto">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">{t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              {t.hero.headlinePrefix}
              <span className="text-primary">{t.hero.headlineGradient}</span>
              {t.hero.headlineSuffix}
              <span className="text-primary">{t.hero.headlineTime}</span>
            </h1>
          </div>

          {/* Imagem: direita no desktop (span 2 linhas), logo após o título no mobile */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 flex flex-col justify-center lg:justify-end lg:items-end animate-fade-in">
            <img
              src="/Mapa-da-Alma/hero-nova.jpeg"
              alt="Mapa da Alma"
              className="w-full max-w-xs sm:max-w-md lg:max-w-xl object-contain drop-shadow-2xl max-h-full mx-auto"
            />
          </div>

          {/* Bloco 2: Subtítulo + CTA + Trust (abaixo do título no desktop, por último no mobile) */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 flex flex-col justify-start space-y-6 lg:space-y-9 animate-fade-in text-center mx-auto">
            {/* Subtitle - Paragraph 1 */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              <span className="text-primary"> {t.hero.subheadlineParagraph1Prefix}</span>
              {t.hero.subheadlineParagraph1Link}
              <span className="text-foreground"> {t.hero.subheadlineParagraph1Bold1}</span>
              {t.hero.subheadlineParagraph1Middle1}
              <span className="text-foreground"> {t.hero.subheadlineParagraph1Bold2}</span>
              {t.hero.subheadlineParagraph1Middle2}
            </p>

            {/* Anti-objection line */}
            <p className="text-sm sm:text-base text-foreground">
              {t.hero.antiObjection}
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex justify-center">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="w-full sm:w-auto whitespace-normal text-base sm:text-lg px-6 sm:px-16 py-6 sm:py-7 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300"
              >
                {t.hero.ctaButton}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{t.hero.trust1}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{t.hero.trust2}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{t.hero.trust3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;