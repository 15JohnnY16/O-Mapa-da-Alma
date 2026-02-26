import { Heart, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthorityProps {
  scrollToForm: () => void;
}

export default function AuthorityCarta({ scrollToForm }: AuthorityProps) {
  return (
    <section className="py-20 bg-navy-light overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Minha História
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mt-6 mb-12">
            Como a <span className="text-primary">Carta da Alma</span> Nasceu?
          </h2>
        </div>

        {/* Grid História */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Foto + Citação Flutuante */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative bg-card">
              {/* Placeholder da Foto da Astróloga */}
              <div className="w-full h-full bg-gradient-to-t from-navy to-navy-light opacity-80" />
              <img src="/images/autoridade-placeholder.jpg" alt="Foto da Autora" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
            </div>
            
            {/* Box Flutuante (Citação) */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-card border border-primary/20 p-6 rounded-xl shadow-xl max-w-xs backdrop-blur-md">
              <span className="text-4xl text-primary font-serif">“</span>
              <p className="text-sm text-foreground font-medium italic relative -top-4">
                Olá, eu sou a Rafa! <br /> Eu não comecei a estudar astrologia pra prever nada.  Eu comecei pra me conhecer.
              </p>
            </div>
          </div>

          {/* Texto História */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Quando meu filho mais novo nasceu, o mapa dele mostrou uma concentração enorme de 
              <span className="text-foreground"> Escorpião</span> e <span className="text-foreground"> Capricórnio</span>.
              Aquilo não parecia só um detalhe. Parecia um 
              <span className="text-primary"> código</span>, pedindo
              <span className="text-primary"> tradução</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Então eu fui estudar para entender isso na prática: no jeito dele sentir, se proteger, se frustrar, se impor, se fechar, se fortalecer. E, quanto mais eu estudava, mais uma coisa simples ficava clara: mapa astral não é um monte de termos bonitos. É uma forma de organizar, com precisão, a essência do que a pessoa já é.
            </p>
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
              <p className="text-foreground font-medium">
                E assim nasceu o Mapa da Alma, uma leitura completa, profunda, escrita para organizar padrões e dar direção, sem horóscopo genérico e sem astrologuês.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A Carta da Alma é a versão mais enxuta, com a mesma essência. Ela pega os pontos centrais do seu mapa e devolve com <span className="text-primary">reconhecimento</span>.
            </p>
          </div>
        </div>

        {/* Depoimentos Rápidos */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <div className="bg-white text-navy p-4 rounded-xl shadow-md flex gap-4 items-start">
            <div className="bg-red-100 p-2 rounded-full shrink-0">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <p className="text-sm italic">"Uma amiga leu e chorou. Finalmente alguém tinha colocado em palavras o que ela sentia há anos."</p>
          </div>
          <div className="bg-white text-navy p-4 rounded-xl shadow-md flex gap-4 items-start">
            <div className="bg-green-100 p-2 rounded-full shrink-0">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm italic">"Outra pessoa mostrou o texto pro terapeuta. Ele disse que não precisava de mais nada. Que ali já tinha tudo."</p>
          </div>
        </div>

        {/* Box Roxo/Navy de Conclusão */}
        <div className="bg-navy border border-primary/30 rounded-2xl p-8 text-center shadow-2xl mb-12">
          <p className="text-lg text-foreground font-medium leading-relaxed">
            Eu percebi que tinha algo diferente ali. <span className="text-primary">Não era adivinhação. Era tradução.</span> <br/>
            Eu estava pegando o que estava escondido no mapa e transformando em espelho.
          </p>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-foreground">
            A Carta da Alma nasceu disso. Da vontade de entregar clareza real para quem está cansado de repetir.
          </p>
          <div className="p-3 border border-primary/20 bg-primary/5 rounded-xl">
             <p className="text-primary font-serif text-lg">
               Porque você não precisa de mais informação. <br/>
               Você precisa de reconhecimento que ativa decisão.
             </p>
          </div>
        </div>

        {/* --- BOX FINAL: Vagas Limitadas (Estilo Glassmorphism Premium) --- */}
        <div className="relative mt-8 md:mt-16 mx-auto max-w-3xl">
            
            {/* Glow Externo Forte */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/40 via-purple-600/30 to-primary/20 blur-3xl rounded-[3rem] opacity-70 pointer-events-none" />
            
            {/* O Box de "Vidro" */}
            <div className="relative rounded-3xl border border-white/10 bg-navy/60 shadow-2xl overflow-hidden backdrop-blur-xl p-8 md:p-12 text-center transform hover:scale-[1.02] transition-transform duration-300">
            
                {/* Luzes Internas (Blobs para dar profundidade) */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/50 blur-[120px] rounded-full pointer-events-none opacity-60" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-900/50 blur-[120px] rounded-full pointer-events-none opacity-70" />

                {/* Conteúdo */}
                <div className="relative z-10 space-y-8">
                    
                    {/* Badge Elegante Substituindo o Ícone Solto */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                        <Clock className="w-4 h-4 text-primary" /> Alta Demanda
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-sm">
                            Vagas Limitadas Por Semana
                        </h3>
                        <p className="text-gray-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed drop-shadow-sm">
                            Para garantir a qualidade da sua Carta personalizada, eu trabalho com um número limitado de pedidos por semana. Quando esse limite é atingido, os novos pedidos entram em lista de espera.
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                        {/* Botão Responsivo e Alinhado */}
                        <Button 
                          onClick={scrollToForm}
                          size="lg"
                          className="w-full sm:w-auto h-auto min-h-[56px] py-3 px-4 sm:px-10 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full shadow-lg shadow-primary/30 text-base sm:text-lg hover:scale-105 transition-transform flex items-center justify-center whitespace-normal text-center relative z-20"
                        >
                          Garantir Minha Carta Agora
                        </Button>
                        <p className="text-xs text-white/60 flex items-center justify-center gap-1 font-medium relative z-20">
                          ⚡ Solicite hoje e receba em até 48 horas
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}