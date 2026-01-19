import { Sparkles, FileText, Map, Clock } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 constellation-pattern opacity-30" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">A Solução</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Apresentando: O{" "}
            <span className="text-gradient-gold">MAPA DA ALMA</span>
          </h2>
          
          <p className="text-xl text-primary font-medium">
            Não é apenas um mapa astral. É um Dossiê de Reparação Sistêmica.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Diferente de mapas gerados por computador, este é um{" "}
              <span className="text-foreground font-medium">documento artesanal de +40 páginas</span>{" "}
              que integra três saberes ancestrais poderosos:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>
                <div>
                  <span className="text-foreground font-medium">Astrologia Profunda</span>
                  <p className="text-sm text-muted-foreground">Além do signo solar: Quíron, Lilith, Plutão e seus mistérios.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>
                <div>
                  <span className="text-foreground font-medium">Genealogia Sistêmica</span>
                  <p className="text-sm text-muted-foreground">As lealdades invisíveis que você carrega da sua linhagem.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>
                <div>
                  <span className="text-foreground font-medium">Teoria dos Graus</span>
                  <p className="text-sm text-muted-foreground">A precisão exata de cada posicionamento planetário.</p>
                </div>
              </li>
            </ul>
            
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-foreground font-medium italic">
                "Ele não prevê seu futuro; ele devolve a você a caneta para escrevê-lo."
              </p>
            </div>
          </div>

          {/* Right: Visual representation */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl border border-primary/20 bg-gradient-to-br from-navy-light to-navy-medium p-8 flex flex-col justify-center items-center text-center">
              {/* Document mockup */}
              <div className="w-full max-w-xs space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-foreground">Seu Mapa Pessoal</h3>
                  <p className="text-sm text-muted-foreground">+40 páginas de análise profunda</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <Map className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Mapa Completo</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Cronologia 0-90 anos</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Plano de Alquimia</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
