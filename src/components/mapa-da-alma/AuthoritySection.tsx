import { Star, Quote } from "lucide-react";
import { translations as t } from "@/lib/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const AuthoritySection = () => {
  const [api, setApi] = useState<CarouselApi>();

  // Use "as any" to access properties that might not exist in all language types yet
  // or filter them out if they are undefined
  const rawTestimonials = [
    {
      text: t.authority.testimonial1,
      author: t.authority.testimonial1Author,
      role: t.authority.testimonial1Role,
      rating: 5,
    },
    {
      text: t.authority.testimonial2,
      author: t.authority.testimonial2Author,
      role: t.authority.testimonial2Role,
      rating: 5,
    },
    {
      text: t.authority.testimonial3,
      author: t.authority.testimonial3Author,
      role: t.authority.testimonial3Role,
      rating: 5,
    },
    {
      text: (t.authority as any).testimonial4,
      author: (t.authority as any).testimonial4Author,
      role: (t.authority as any).testimonial4Role,
      rating: 5,
    },
    {
      text: (t.authority as any).testimonial5,
      author: (t.authority as any).testimonial5Author,
      role: (t.authority as any).testimonial5Role,
      rating: 5,
    },
    {
      text: (t.authority as any).testimonial6,
      author: (t.authority as any).testimonial6Author,
      role: (t.authority as any).testimonial6Role,
      rating: 5,
    },
  ];

  const testimonials = rawTestimonials.filter((item) => item.text);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 constellation-pattern opacity-20" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Minha História */}
        <div className="text-center mb-12">
          <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Minha História
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mt-6 mb-12">
            Como o <span className="text-primary">Mapa da Alma</span> Nasceu?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Foto + Citação Flutuante */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative bg-card">
              <div className="w-full h-full bg-gradient-to-t from-navy to-navy-light opacity-0" />
              <img src="Rafa-Cabral.png" alt="Foto da Autora" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Box Flutuante (Citação) */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-card border border-primary/20 p-5 rounded-xl shadow-xl max-w-xs backdrop-blur-md">
              <p className="text-sm text-foreground font-medium italic">
                Oi, eu sou a Rafa! <br /> Pra mim, astrologia nunca foi sobre previsão. Sempre foi sobre clareza, padrão e direção.
              </p>
            </div>
          </div>

          {/* Texto História */}
          <div className="space-y-9">
            <p className="text-muted-foreground leading-relaxed">
              <span className="text-foreground">Quando meu filho caçula nasceu, abri o mapa dele pela primeira vez.</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Vi Escorpião e Capricórnio dominando tudo. Não parecia dado técnico. Parecia aviso. Se ninguém traduzir isso, vai virar culpa, medo, dureza.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Comecei a estudar por causa dele. E acabei me encontrando no processo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sempre fui obcecada pelo comportamento humano. Coaching, psicologia positiva, comportamento organizacional. Nada respondia à pergunta que eu carregava há anos: por que eu nunca cabia no meu próprio signo?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A resposta estava na astrologia. Não nos signos isolados. No mapa inteiro. Nos padrões que se repetem. No que você herdou sem pedir. No que você veio fazer e ainda não fez.
            </p>
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
              <p className="text-foreground font-medium">
                O Mapa da Alma nasceu disso. Da leitura que eu sempre quis receber. E nunca encontrei em lugar nenhum.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-serif text-2xl md:text-4xl text-foreground">
            {t.authority.testimonialsHeaderPrefix}{" "}
            <span className="text-primary">
              {t.authority.testimonialsHeaderHighlight}
            </span>
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <div className="group h-full p-5 md:p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-300 flex flex-col">
                    {/* Quote icon */}
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-primary/30 mb-3 md:mb-4 shrink-0" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-3 md:mb-4 shrink-0">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-sm md:text-base text-foreground leading-relaxed mb-4 md:mb-6 italic flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs md:text-sm font-medium text-primary">
                          {testimonial.author
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
export default AuthoritySection;
