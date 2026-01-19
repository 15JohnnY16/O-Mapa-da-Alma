import { Shield, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const OfferSection = () => {
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
                Invista na Sua <span className="text-primary">Transformação</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Este é um investimento na sua liberdade ancestral. Quanto vale parar de repetir padrões que não são seus?
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-muted-foreground line-through text-lg">De R$ 497,00</p>
              <div className="flex flex-col items-center gap-1">
                <span className="text-5xl md:text-6xl font-serif text-primary">R$ 197</span>
                <span className="text-muted-foreground">à vista</span>
              </div>
              <p className="text-lg text-foreground">
                ou <span className="text-primary font-semibold">10x de R$ 21,75</span>
              </p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-10 py-7 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300 animate-glow-pulse"
            >
              Quero Meu Mapa da Alma
            </Button>

            {/* Scarcity alert */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 max-w-lg mx-auto">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-foreground text-left">
                <span className="font-semibold">Atenção:</span> Como cada análise é escrita manualmente, 
                produzo apenas <span className="text-primary font-semibold">5 mapas por semana</span>. 
                Garanta sua vaga na agenda atual.
              </p>
            </div>

            {/* Guarantee */}
            <div className="flex items-center justify-center gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 max-w-md mx-auto">
              <Shield className="w-10 h-10 text-primary flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-foreground">Garantia Incondicional</p>
                <p className="text-sm text-muted-foreground">
                  Se não sentir que descrevi sua alma, devolvo seu investimento.
                </p>
              </div>
            </div>

            {/* Delivery time */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Entrega em até 5 dias úteis após confirmação do pagamento</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
