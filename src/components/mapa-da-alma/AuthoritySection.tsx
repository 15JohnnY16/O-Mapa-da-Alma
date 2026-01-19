import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Eu chorava lendo porque entendi 30 anos de bloqueio financeiro em um parágrafo. O Mapa da Alma mudou minha relação com meu pai e meu dinheiro.",
    author: "Marina S.",
    role: "Empresária, 42 anos",
    rating: 5,
  },
  {
    text: "Nunca tinha visto um mapa tão profundo. Parecia que ela estava dentro da minha cabeça. O plano de 90 dias me deu direção pela primeira vez na vida.",
    author: "Carla R.",
    role: "Terapeuta, 38 anos",
    rating: 5,
  },
  {
    text: "Descobri que carregava a dor da minha avó sem saber. Depois do mapa, comecei um processo de cura que mudou toda minha família.",
    author: "Juliana M.",
    role: "Professora, 35 anos",
    rating: 5,
  },
];

const AuthoritySection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 constellation-pattern opacity-20" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Author bio */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-8 items-center p-6 md:p-10 rounded-2xl border border-border bg-card/50">
            {/* Photo placeholder */}
            <div className="flex justify-center md:justify-start">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-navy-medium flex items-center justify-center">
                  <span className="text-4xl text-primary font-serif">AS</span>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="md:col-span-2 text-center md:text-left space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-foreground">Ana Sofia</h3>
                <p className="text-primary font-medium">Especialista em Astrologia Sistêmica</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Há mais de 15 anos unindo saberes ancestrais com pragmatismo moderno. 
                Formada em Psicologia, especialista em Constelações Familiares e estudiosa da 
                Teoria dos Graus. Já guiou mais de 2.000 mulheres na jornada de autoconhecimento 
                através da Astrogenealogia.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">+2.000 mapas</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">15 anos de estudo</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Psicóloga</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            O Que Dizem Sobre o <span className="text-primary">Mapa da Alma</span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
