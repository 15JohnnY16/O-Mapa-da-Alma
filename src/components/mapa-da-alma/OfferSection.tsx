import { ShieldCheck, Lock, Fingerprint, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { translations as t } from "@/lib/i18n";

const OfferSection = () => {

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20 bg-navy-light">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Headline (fora da caixa de preço) */}
        <div className="text-center mb-8 space-y-4">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            {t.offer.headlinePrefix}
            <span className="text-primary">{t.offer.headlinePrimary}</span>
            {t.offer.headlineMiddle}
            <span className="text-primary">{t.offer.headlinePrimary2}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            {t.offer.subtitle}
            <span className="text-foreground">{t.offer.subtitleForeground}</span>
            {t.offer.subtitleSuffix}
          </p>
        </div>

        {/* Offer card */}
        <div className="relative p-5 md:p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-navy-medium to-navy">
          {/* Decorative glow */}
          <div className="absolute inset-0 rounded-3xl glow-gold opacity-20" />

          <div className="relative z-10 text-center space-y-6 md:space-y-8">

            {/* QUANTO VALE badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30">
              <span className="text-xs text-primary font-bold uppercase tracking-wider">{t.offer.quantoVale}</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-muted-foreground line-through text-sm md:text-lg">{t.offer.oldPrice}</p>
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl md:text-5xl lg:text-6xl font-sans text-primary lining-nums font-bold tracking-tight">{t.offer.newPrice}</span>
              </div>
              <p className="text-base md:text-lg text-foreground">
                {t.offer.installmentsPrefix} <span className="text-primary">{t.offer.installmentsHighlight}</span>
              </p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={scrollToForm}
              className="w-full md:w-auto h-14 md:h-auto text-base md:text-xl px-16 py-7 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300 animate-glow-pulse rounded-xl md:rounded-lg"
            >
              {t.offer.cta}
            </Button>

            <div className="flex items-center justify-center gap-1.5 mt-4 opacity-80">
              <Lock className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
              <span className="text-xs md:text-sm text-green-500 font-medium">{t.offer.security}</span>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-border pt-6 md:pt-8 mt-6 md:mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Badge 1: Guarantee */}
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base text-green-500 font-medium">{(t.offer as any).badges?.badge1Title}</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{(t.offer as any).badges?.badge1Sub}</p>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Fingerprint className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-blue-500 font-medium">{(t.offer as any).badges?.badge2Title}</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{(t.offer as any).badges?.badge2Sub}</p>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    <Infinity className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-yellow-500 font-medium">{(t.offer as any).badges?.badge3Title}</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground">{(t.offer as any).badges?.badge3Sub}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
