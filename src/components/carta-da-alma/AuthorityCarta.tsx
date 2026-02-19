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
                O problema não era falta de informação. Era falta de reconhecimento.
              </p>
            </div>
          </div>

          {/* Texto História */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Eu comecei a estudar mapas porque queria entender por que eu repetia os mesmos erros. 
              <strong className="text-primary"> Relacionamentos que drenavam. Decisões que sabotavam. Dinheiro que escorria pelos dedos.</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Fiz terapia. Li livros. Paguei por mapas técnicos cheios de termos que eu não entendia. Nada tocava fundo. Nada me fazia sentir que alguém realmente me via.
            </p>
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
              <p className="text-foreground font-medium">
                Até que eu percebi uma coisa: As pessoas não precisam de mais teoria. Elas precisam de alguém que nomeie o que elas sentem.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Comecei a escrever o que via nos mapas de amigas. Sem jargão. Só traduzindo os padrões.
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

        {/* Box Final: Vagas Limitadas (Print 10) */}
        <div className="bg-gradient-to-r from-primary/80 to-purple-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl mx-auto max-w-3xl transform hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center mb-4">
             <Clock className="w-8 h-8 text-white/90" />
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Vagas Limitadas Por Semana
          </h3>
          <p className="text-white/80 mb-8 leading-relaxed">
            Para garantir a qualidade da sua Carta personalizada, eu trabalho com um número limitado de pedidos por semana. 
            Quando esse limite é atingido, os novos pedidos entram em lista de espera.
          </p>
          
          <Button 
            onClick={scrollToForm}
            className="bg-white text-primary hover:bg-white/90 font-bold h-12 px-8 rounded-full shadow-lg w-full md:w-auto"
          >
            Garantir Minha Carta Agora
          </Button>
          <p className="mt-4 text-xs text-white/60 flex items-center justify-center gap-1">
             ⚡ Solicite hoje e receba em até 48 horas
          </p>
        </div>

      </div>
    </section>
  );
}