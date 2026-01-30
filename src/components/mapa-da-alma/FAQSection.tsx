import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { translations as t } from "@/lib/i18n";

interface FAQSectionProps {
  type: "venda" | "gratis"
}

const FAQSection = ({ type }: FAQSectionProps) => {

  const saleFaqs = [
    {
      question: t.faq.q1,
      answer: t.faq.a1,
    },
    {
      question: t.faq.q2,
      answer: t.faq.a2,
    },
    {
      question: t.faq.q3,
      answer: t.faq.a3,
    },
    {
      question: t.faq.q4,
      answer: t.faq.a4,
    },
    {
      question: t.faq.q5,
      answer: t.faq.a5,
    },
    {
      question: t.faq.q6,
      answer: t.faq.a6,
    },
    {
      question: t.faq.q7,
      answer: t.faq.a7,
    },
    {
      question: t.faq.q8,
      answer: t.faq.a8,
    },
    {
      question: t.faq.q9,
      answer: t.faq.a9,
    },
    {
      question: t.faq.q10,
      answer: t.faq.a10,
    },
    {
      question: t.faq.q11,
      answer: t.faq.a11,
    },
    {
      question: t.faq.q12,
      answer: t.faq.a12,
    },
    {
      question: t.faq.q13,
      answer: t.faq.a13,
    },
    {
      question: t.faq.q14,
      answer: t.faq.a14,
    },
    {
      question: t.faq.q15,
      answer: t.faq.a15,
    },
    {
      question: t.faq.q16,
      answer: t.faq.a16,
    },
    {
      question: t.faq.q17,
      answer: t.faq.a17,
    },
    {
      question: t.faq.q18,
      answer: t.faq.a18,
    },
    {
      question: t.faq.q19,
      answer: t.faq.a19,
    },
  ];

  const sampleFaqs = [
    {
      question: "É realmente grátis? Vou ter que pagar algo?",
      answer: "Sim, é 100% gratuita. Sem pegadinhas, sem cobrança posterior. A Carta da Alma é um presente para você ter um primeiro contato com a leitura personalizada do seu mapa. Você não precisa cadastrar cartão de crédito nem nenhuma forma de pagamento.",
    },
    {
      question: "Por que vocês estão dando isso de graça?",
      answer: "A Carta da Alma é uma amostra do trabalho completo do Mapa da Alma. Queremos que você experimente a qualidade da leitura personalizada antes de decidir se quer se aprofundar. É uma forma de você conhecer a abordagem, a linguagem e sentir se ressoa com você, sem compromisso.",
    },
    {
      question: "Quanto tempo leva para receber?",
      answer: "A Carta da Alma é personalizada e entregue em até 5 dias úteis após a confirmação dos seus dados. Não é um texto automático, cada carta passa por análise cuidadosa e escrita personalizada. Você recebe através do contato que compartilhar conosco em um arquivo no formato PDF.",
    },
    {
      question: "O que exatamente eu preciso fornecer?",
      answer: "Apenas três informações: sua data completa de nascimento (dia/mês/ano), hora de nascimento (quanto mais precisa, melhor) e cidade e estado onde nasceu. Leva menos de 1 minuto para preencher.",
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim. Seus dados são usados apenas para gerar sua Carta da Alma e são armazenados de forma segura. Não compartilhamos suas informações com terceiros.",
    },
    {
      question: "Isso é astrologia mesmo ou é automático?",
      answer: "A Carta da Alma usa um sistema baseado em astrologia real. Não é horóscopo genérico. Ela é gerada a partir do seu mapa natal calculado com seus dados exatos de nascimento. É uma leitura personalizada que identifica aspectos-chave da sua jornada.",
    },
    {
      question: "Vai ser genérico igual horóscopo de revista?",
      answer: "Não. A Carta da Alma é calculada com base nos seus dados únicos de nascimento. Cada pessoa recebe uma leitura diferente, focada nos principais padrões do seu mapa. Não é texto pronto por signo solar, é interpretação baseada na sua configuração astrológica completa.",
    },
    {
      question: "Qual a diferença entre a Carta da Alma e o Mapa da Alma completo?",
      answer: "A Carta da Alma é uma introdução gratuita que traz os principais destaques do seu mapa, seus dons naturais, desafios centrais e/ou um direcionamento inicial. É como um \"resumo executivo\" da sua jornada.\n\nO Mapa da Alma (completo e pago) é um livro personalizado de mais de 40 páginas com análise profunda de todas as áreas da sua vida (trabalho, dinheiro, saúde, relacionamentos), identificação de padrões repetitivos, análise da sua Espiral dos 30 Anos e um plano prático de 90 dias. É o mergulho completo.",
    },
    {
      question: "Não sei minha hora exata de nascimento. Posso fazer mesmo assim?",
      answer: "Sim, você pode! A hora influencia alguns aspectos do mapa, mas a Carta da Alma trabalha com os elementos que permanecem estáveis mesmo sem a hora exata. Se você tiver uma estimativa aproximada (manhã/tarde/noite), já ajuda bastante.",
    },
    {
      question: "Posso fazer para outras pessoas (filhos, parceiro, amigos)?",
      answer: "A Carta da Alma é feita para a pessoa que está preenchendo os dados. Se quiser fazer para outras pessoas, você pode preencher novamente com os dados delas. É gratuito. Só lembre que o resultado será enviado para o e-mail/WhatsApp que você cadastrar. \n\n Caso seja de alguma pessoa menor de 18 anos, será redirecionado para outro fomulário.",
    },
    {
      question: "Vou receber spam depois?",
      answer: "Você pode receber conteúdos sobre astrologia, autoconhecimento e novidades sobre o Mapa da Alma, mas sempre com a opção de cancelar quando quiser. Não fazemos spam e respeitamos sua privacidade.",
    },
    {
      question: "E se eu não me reconhecer no que está escrito?",
      answer: "Primeiro, confira se os dados (especialmente hora e cidade) estão corretos. Pequenas variações podem alterar alguns aspectos. Se ainda assim não ressoar, tudo bem a Carta da Alma é apenas uma introdução. Não há compromisso e você não perde nada por tentar.",
    },
    {
      question: "Posso compartilhar com meu terapeuta/coach?",
      answer: "Sim! A Carta da Alma pode ser uma ferramenta de reflexão complementar. Muitas pessoas compartilham com seus profissionais de confiança como ponto de partida para conversas sobre autoconhecimento.",
    },
  ];

// 4. Lógica para escolher qual lista usar
  const activeFaqs = type === "venda" ? saleFaqs : sampleFaqs;

  return (
    <section className="py-20 md:py-28 bg-navy-light">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">{t.faq.badge}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">
            {t.faq.titlePrefix} <span className="text-primary">{t.faq.titleHighlight}</span>
          </h2>
        </div>

        {/* FAQ Accordion - Agora mapeando o 'activeFaqs' */}
        <Accordion type="single" collapsible className="space-y-4">
          {activeFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-xl px-6 bg-card/50 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5 whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional help */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {t.faq.footerText}{" "}
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