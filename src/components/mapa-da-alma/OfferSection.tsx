import { ShieldCheck, Lock, Zap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const OfferSection = () => {
  const { t } = useLanguage();

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Offer card */}
        <div className="relative p-8 md:p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-navy-medium to-navy">
          {/* Decorative glow */}
          <div className="absolute inset-0 rounded-3xl glow-gold opacity-20" />

          <div className="relative z-10 text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                {t.offer.titlePrefix} <span className="text-primary">{t.offer.titleHighlight}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.offer.description}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-muted-foreground line-through text-lg">{t.offer.oldPrice}</p>
              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl md:text-5xl lg:text-6xl font-sans text-primary lining-nums">{t.offer.newPrice}</span>
              </div>
              <p className="text-lg text-foreground">
                {t.offer.installmentsPrefix} <span className="text-primary font-semibold">{t.offer.installmentsHighlight}</span>
              </p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-10 py-7 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300 animate-glow-pulse"
            >
              {t.offer.cta}
            </Button>

            {/* Scarcity alert */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl mb-8">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-foreground text-left">
                <span className="font-semibold">{t.offer.scarcityPrefix}</span> {t.offer.scarcityMiddle}{" "}
                <span className="text-primary font-semibold">{t.offer.scarcityHighlight}</span>
                {t.offer.scarcitySuffix}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-border pt-8 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Badge 1: Guarantee */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-green-500 font-semibold">{(t.offer as any).badges?.badge1Title}</h4>
                    <p className="text-xs text-muted-foreground">{(t.offer as any).badges?.badge1Sub}</p>
                  </div>
                </div>

                {/* Badge 2: Security */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-blue-500 font-semibold">{(t.offer as any).badges?.badge2Title}</h4>
                    <p className="text-xs text-muted-foreground">{(t.offer as any).badges?.badge2Sub}</p>
                  </div>
                </div>

                {/* Badge 3: Delivery */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-purple-500 font-semibold">{(t.offer as any).badges?.badge3Title}</h4>
                    <p className="text-xs text-muted-foreground">{(t.offer as any).badges?.badge3Sub}</p>
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