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
                <h3 className="font-serif text-2xl text-foreground">
                  {t.authority.bioName}
                </h3>
                <p className="text-primary font-medium">
                  {t.authority.bioTitle}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.authority.bioDescription}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {t.authority.stat1}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {t.authority.stat2}
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {t.authority.stat3}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
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
                  <div className="group h-full p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-300 flex flex-col">
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-primary/30 mb-4 shrink-0" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4 shrink-0">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-foreground leading-relaxed mb-6 italic flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {testimonial.author
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
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
