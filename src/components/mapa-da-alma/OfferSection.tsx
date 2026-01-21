import { Shield, Clock, AlertTriangle } from "lucide-react";
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
                <span className="text-5xl md:text-6xl font-serif text-primary">{t.offer.newPrice}</span>
                <span className="text-muted-foreground">{t.offer.paymentType}</span>
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
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-foreground text-left">
                <span className="font-semibold">{t.offer.scarcityPrefix}</span> {t.offer.scarcityMiddle}{" "}
                <span className="text-primary font-semibold">{t.offer.scarcityHighlight}</span>
                {t.offer.scarcitySuffix}
              </p>
            </div>

            {/* Guarantee */}
            <div className="flex items-center justify-center gap-4 p-4">
              <Shield className="w-10 h-10 text-primary flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-foreground">{t.offer.guaranteeTitle}</p>
                <p className="text-sm text-muted-foreground">
                  {t.offer.guaranteeText}
                </p>
              </div>
            </div>

            {/* Delivery time */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{t.offer.delivery}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;