import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with constellation pattern */}
      <div className="absolute inset-0 bg-background constellation-pattern" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Decorative compass element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Compass className="w-[600px] h-[600px] text-primary" strokeWidth={0.5} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Astrogenealogia • Transformação Profunda</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            Descubra o{" "}
            <span className="text-gradient-gold">Código Oculto</span>{" "}
            da Sua Linhagem e Desbloqueie Seu Destino em{" "}
            <span className="text-primary">90 Dias</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Você não é uma folha ao vento. Você é uma{" "}
            <span className="text-foreground font-medium">Estrutura Semente</span>{" "}
            aguardando ativação. Pare de repetir padrões que não são seus.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-gold glow-gold-hover transition-all duration-300"
            >
              Quero Decodificar Meu Mapa
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>+40 Páginas Artesanais</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Plano de 90 Dias</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Garantia Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
