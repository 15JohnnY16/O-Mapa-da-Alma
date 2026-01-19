import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "É previsão de futuro?",
    answer: "Não. O Mapa da Alma não é sobre prever o que vai acontecer, mas sobre entender a arquitetura do seu destino. Ele revela os padrões herdados, os ciclos naturais da sua vida e te dá ferramentas para tomar decisões conscientes. Você continua com o livre arbítrio — mas agora com clareza.",
  },
  {
    question: "Preciso saber a hora exata do meu nascimento?",
    answer: "Sim, a hora de nascimento é essencial para a precisão da Teoria dos Graus e para calcular seu Ascendente, casas astrológicas e aspectos específicos. Se você não sabe, pode verificar na certidão de nascimento ou no registro do hospital. Sem essa informação, a análise perde profundidade.",
  },
  {
    question: "O Mapa da Alma substitui terapia?",
    answer: "Não substitui, mas complementa e acelera. Muitas pessoas passam anos em terapia sem entender a raiz de certos padrões. O Mapa da Alma traz clareza profunda sobre as lealdades invisíveis e memórias ancestrais que você carrega, permitindo que o processo terapêutico seja mais direcionado e efetivo.",
  },
  {
    question: "Em quanto tempo recebo meu mapa?",
    answer: "O prazo é de 5 dias úteis após a confirmação do pagamento. Como cada mapa é escrito artesanalmente e personalizado para você, não é possível acelerar o processo. Qualidade leva tempo. Você receberá um PDF completo com +40 páginas diretamente no seu email.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Dúvidas Frequentes</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            Perguntas e <span className="text-primary">Respostas</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-xl px-6 bg-card/50 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional help */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Ainda tem dúvidas? Fale diretamente pelo{" "}
            <a 
              href="https://wa.me/5500000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
