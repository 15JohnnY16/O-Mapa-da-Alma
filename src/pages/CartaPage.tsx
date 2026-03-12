import { useRef, useEffect } from "react";
import Footer from "@/components/mapa-da-alma/Footer";
import HeroCarta from "@/components/carta-da-alma/HeroCarta";
import PainCarta from "@/components/carta-da-alma/PainCarta";
import SolutionCarta from "@/components/carta-da-alma/SolutionCarta";
import ParaQuemECarta from "@/components/carta-da-alma/ParaQuemECarta";
import OQueRecebeCarta from "@/components/carta-da-alma/OQueRecebeCarta";
import ComoFuncionaCarta from "@/components/carta-da-alma/ComoFuncionaCarta";
import AuthorityCarta from "@/components/carta-da-alma/AuthorityCarta";
import FormSection from "@/components/mapa-da-alma/FormSection";
import FAQSection from "@/components/mapa-da-alma/FAQSection";
import PanoramaCarta from "@/components/carta-da-alma/PanoramaCarta";
import { Lock, Scale, BatteryCharging, Repeat, Milestone, Brain, Tag, ArrowUpToLine, Activity } from "lucide-react";

// Definição dos temas disponíveis
type CartaTheme = 'padrao' | 'carreira' | 'relacionamento' | 'dinheiro';

interface CartaPageProps {
  theme?: CartaTheme;
}

export default function CartaPage({ theme = 'padrao' }: CartaPageProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let tituloAba = "Carta da Alma";

    if (theme === 'carreira') tituloAba = "Carta da Alma | Carreira";
    if (theme === 'relacionamento') tituloAba = "Carta da Alma | Relacionamento";
    if (theme === 'dinheiro') tituloAba = "Carta da Alma | Dinheiro";

    document.title = tituloAba;

    return () => {
      document.title = "Mapa da Alma";
    };
  }, [theme]);

  const content = {
    padrao: {
      hero: {
        imageSrc: "/Carta-da-Alma/Padrao/hero-carta.jfif"
      },
      pain: {
        imageSrc: "/Carta-da-Alma/Padrao/pain-carta.png"
      },
      solution: {
        imageSrc: "/Carta-da-Alma/Padrao/solution-carta.png"
      },
      paraQuemE: undefined
    },
    carreira: {
      hero: {
        badge: "Desbloqueio Profissional",
        title: (
          <>
            Descubra Porque <br className="hidden md:block" />
            <span className="text-gradient-gold">
              Você Trava <br className="hidden md:block" /> Antes de Crescer
            </span>{" "}
            <br className="hidden md:block" />
            na Carreira
          </>
        ),
        subtitle: "Receba uma leitura gratuita que nomeia os padrões profissionais que você repete sem perceber. Em 48 horas, sem compromisso.",
        imageSrc: "/Carta-da-Alma/Carreira/hero-carta-carreira.png"
      },
      pain: {
        title: <span className="whitespace-nowrap">O Teto Que <span className="text-primary">Ninguém Te Contou</span> Que Existe</span>,
        description: <>Você trabalha mais que todo mundo. Entrega resultado. Tem currículo sólido. Mas quando chega perto da promoção, você <strong className="text-foreground">trava</strong>. Adia a conversa sobre aumento. Aceita sobrecarga sem questionar porque precisa provar valor o tempo todo.</>,
        pain1: <>Não é falta de competência. Não é síndrome do impostor que vai passar com mais autoestima. É algo mais profundo operando: você carrega um <strong className="text-foreground">teto invisível herdado </strong>sobre quanto sucesso você pode ter sem sentir que está traindo quem veio antes.</>,
        pain2: <i><strong className="text-foreground">Gerações de mulheres na sua família que não tiveram permissão para brilhar, que trabalharam dobrado para ganhar metade, que aprenderam a se fazer pequenas para caber.</strong></i>,
        pain3: <>E você herdou essa lealdade como se fosse sua. Por isso você chega perto de ultrapassar esse limite e o corpo trava. Como se crescer demais fosse perigoso. Como se você <strong className="text-primary">não merecesse ocupar esse espaço.</strong></>,
        imageSrc: "/Carta-da-Alma/Carreira/pain-carta-carreira.png"
      },
      solution: {
        title: <>A Clareza Que <span className="text-primary">Destranca Sua Carreira</span></>,
        text1: <>Existe uma maneira de quebrar esse teto sem precisar se matar de trabalhar mais. Sem forçar confiança que você não sente. Sem fingir que basta "querer muito" para conseguir.</>,
        boxHighlight: <>A Carta da Alma mostra exatamente onde está esse bloqueio e como destravar. Não é sobre "acreditar mais em você". É sobre entender a raiz do padrão e reprogramar de dentro para fora.</>,
        text2: <>Em até 48 horas após o preenchimento do formulário, você recebe um áudio personalizado de até 15 minutos revelando: </>,
        ctaText: <>Receber Minha Clareza Agora</>,
        imageSrc: "/Carta-da-Alma/Carreira/solution-carta-carreira.png",
        bottomHighlight: <>Quando você entende que o problema não é você, mas o que você herdou, <strong className="text-primary">tudo muda</strong>. Você para de se culpar. Para de achar que precisa ser mais forte, mais disciplinada, mais corajosa. E começa a negociar com confiança real. A delegar sem culpa. A crescer sem sentir que está traindo alguém. Porque agora você sabe: <strong className="text-primary">esse espaço sempre foi seu</strong>.</>
      },
      paraQuemE: {
        title: <>A Carta da Alma É <span className="text-primary">Para Você Que...</span></>,
        subtitle: <span className="whitespace-nowrap">Reconhece esses padrões em sua carreira</span>,
        items: [
          { icon: Lock, title: "Trava Antes de Crescer", desc: "Você chega perto da promoção e sabota no último momento. Adia pedir aumento há anos. Aceita sobrecarga sem questionar porque sente que precisa provar valor o tempo todo.", color: "text-amber-400", bg: "bg-amber-400/10" },
          { icon: Scale, title: "Trabalha Dobrado e Ganha Menos", desc: "Você entrega mais resultado que colegas menos qualificados mas continua sendo menos reconhecida. Sente que bate sempre no mesmo teto invisível, não importa quanto se esforce.", color: "text-red-400", bg: "bg-red-400/10" },
          { icon: BatteryCharging, title: "Quer Crescer Sem Se Esgotar", desc: "Você está cansada de carregar tudo sozinha. Quer subir na carreira, ganhar o que merece, mas sem sacrificar saúde, relacionamentos e energia no processo.", color: "text-blue-400", bg: "bg-blue-400/10" }
        ]
      }
    },
    relacionamento: {
      hero: {
        badge: "Amor e Relacionamentos",
        title: <>Descubra os Padrões <span className="text-gradient-gold">Invisíveis</span> Que Você Repete no <span className="text-gradient-gold">Amor</span></>,
        subtitle: "Receba uma leitura gratuita e personalizada que nomeia com precisão o que você sente mas nunca conseguiu explicar. Sem jargão técnico. Sem inventar sua história. Em até 48 horas.",
        imageSrc: "/Carta-da-Alma/Relacionamento/hero-carta-relacionamento.png"
      },
      pain: {
        title: <>A Lealdade Fantasma Que Você Carrega <span className="text-primary">Sem Saber</span></>,
        description: <>Você já percebeu que <strong className="text-foreground">sempre atrai o mesmo tipo de pessoa indisponível</strong>. Termina um relacionamento jurando que vai escolher diferente, mas três meses depois está vivendo a mesma dinâmica com outro nome.</>,
        pain1: <>Parece que você carrega um <strong className="text-foreground">imã para o tipo errado de amor</strong>. E não é falta de disciplina. Não é porque você não quer mudar. Não é porque você é difícil demais ou exigente demais.</>,
        pain2: <>É porque você carrega <strong className="text-foreground">lealdades invisíveis herdadas da sua árvore genealógica</strong>. Você repete dinâmicas que nunca viveu diretamente, mas que foram transmitidas como verdades sobre como o amor funciona.<strong className="text-primary block mt-2"></strong>Como se você tivesse uma missão inconsciente de completar histórias inacabadas de gerações anteriores.</>,
        pain3: <>E enquanto essas <strong className="text-primary mt-2">lealdades fantasmas operarem abaixo da sua consciência</strong>, você vai continuar escolhendo o mesmo tipo. Vai continuar se traindo em silêncio. Vai continuar se perguntando por que sempre bate no mesmo lugar.</>,
        imageSrc: "/Carta-da-Alma/Relacionamento/pain-carta-relacionamento.png"
      },
      solution: {
        title: <>O Reconhecimento Que Finalmente <span className="text-primary">Te Liberta</span>.</>,
        text1: <>A Carta da Alma combina <strong className="text-foreground">astrologia humanizada, astrogenealogia e psicologia arquetípica</strong> para criar uma leitura tão precisa sobre você que você se reconhece na hora.</>,
        boxHighlight: <><strong className="text-primary">Algo clica. </strong>Você para de se <strong className="text-primary">culpar e começa a entender</strong> de onde vem o padrão.
                        <span className="block mt-2"></span>Você vê qual <strong className="text-primary">lealdade invisível</strong> te puxa de volta para o mesmo tipo de parceiro.
                        <span className="block mt-2"></span>Você tem <strong className="text-primary">clareza sobre o que fazer diferente</strong> nos primeiros encontros.</>,
        text2: <>Não é descrição genérica de horóscopo. É <strong className="text-foreground">espelho emocional</strong> que nomeia exatamente o que você sente mas nunca conseguiu explicar.</>,
        ctaText: <>Quero Minha Carta Gratuita Agora</>,
        imageSrc: "/Carta-da-Alma/Relacionamento/solution-carta-relacionamento.png",
        bottomHighlight: <><strong className="text-primary flex flex-col items-center">Imagina ter paz em um relacionamento em vez de ansiedade constante</strong><strong className="text-primary text-center mt-2 flex flex-col items-center"></strong>Imagina parar de desperdiçar meses em relacionamentos que você já sabe que não vão funcionar. Essa clareza existe. E ela começa com reconhecimento real.</>,
      },
      paraQuemE: {
        title: <>A Carta da Alma É Para <span className="text-primary">Para Você Que...</span></>,
        subtitle: "Quer viver um amor tranquilo, recíproco e sem joguinhos.",
        items: [
          { icon: Repeat, title: "Repete o Mesmo Padrão em Amor", desc: "Você sempre atrai o mesmo tipo de pessoa indisponível e quer entender de onde vem esse ciclo para finalmente parar de repetir.", color: "text-red-400", bg: "bg-red-400/10" },
          { icon: Milestone, title: "Está em Transição de Relacionamento", desc: "Você acabou de sair de mais um relacionamento frustrado e precisa de clareza urgente sobre o que escolher diferente da próxima vez.", color: "text-amber-400", bg: "bg-amber-400/10" },
          { icon: Brain, title: "Já tentou Terapia sem Resultado Prático", desc: "Você fez anos de terapia, entendeu o passado, mas continua repetindo os mesmos erros e precisa de um plano concreto para quebrar o ciclo agora.", color: "text-blue-400", bg: "bg-blue-400/10" }
        ]
      }
    },
    dinheiro: {
      hero: {
        badge: "Prosperidade Financeira",
        title: <>Descubra O Padrão Que <span className="text-gradient-gold">Te Trava</span> Com <strong className="text-gradient-gold">Dinheiro</strong></>,
        subtitle: "Você trabalha, se esforça, mas o dinheiro nunca fica de verdade. Receba sua Carta da Alma gratuita e entenda por que você repete o mesmo ciclo financeiro, sem pagar nada para descobrir.",
        imageSrc: "/Carta-da-Alma/Dinheiro/hero-carta-dinheiro.png"
      },
      pain: {
        title: <>O <span className="text-primary">Teto Invisível</span> Que Ninguém Te Contou</>,
        description: "Você já percebeu que não importa quanto ganha, sempre bate no mesmo limite.",
        pain1: <><strong className="text-foreground">O Ciclo Que Nunca Para</strong><span className="block mt-2"></span>Chega uma grana e logo depois vem um gasto inesperado. Você consegue crescer até certo ponto, mas nunca passa disso.</>,
        pain2: <><strong className="text-foreground">A Culpa Que Não É Sua</strong><span className="block mt-2"></span>Você se culpa. Acha que é falta de disciplina, que você é ruim com dinheiro, que deveria se esforçar mais. Mas a verdade é outra.</>,
        pain3: <><strong className="text-foreground">Uma Herança Invisível</strong><span className="block mt-2"></span>Esse teto não é seu. Você herdou. É uma lealdade invisível que vem da sua árvore genealógica, uma crença sobre dinheiro que passou de geração em geração.</>,
        imageSrc: "/Carta-da-Alma/Dinheiro/pain-carta-dinheiro.png"
      },
      solution: {
        title: <><span className="text-primary">Clareza </span>Que Quebra O <span className="text-primary">Ciclo</span></>,
        text1: <><strong className="text-foreground">Astrogenealogia + Psicologia Arquetípica</strong><span className="block mt-2"></span>Não é horóscopo genérico. É uma leitura personalizada que nomeia com precisão cirúrgica por que você subrepreça, gasta o que entra, ou recusa oportunidades.</>,
        boxHighlight: <><strong className="text-foreground">Reconhecimento Que Transforma</strong><span className="block mt-2"></span>Quando você lê e reconhece o padrão, quando finalmente entende que não é falha sua, mas herança genealógica, algo muda.</>,
        text2: <><strong className="text-foreground">Decisões Financeiras Com Clareza</strong><span className="block mt-2"></span>Você para de lutar contra si mesma e começa a tomar decisões com clareza. Você vê onde está se traindo e o que fazer diferente agora.</>,
        ctaText: <span>Quero Minha Carta Gratuita Agora</span>,
        imageSrc: "/Carta-da-Alma/Dinheiro/solution-carta-dinheiro.png",
        bottomHighlight: <span>É a primeira vez que alguém conecta os pontos entre o que você herdou e o que você repete com dinheiro hoje. E entrega isso em linguagem humana, sem jargão técnico, em até 48 horas. De graça."</span>
      },
      paraQuemE: {
        title: <>A Carta da Alma É Para <span className="text-primary">Para Você Que...</span></>,
        subtitle: "Quer ter dinheiro sobrando no fim do mês sem sentir peso na consciência.",
        items: [
          { icon: Tag, title: "Subrepreça Cronicamente", desc: "Você sabe que vale mais, mas trava na hora de cobrar. Sente culpa ao aumentar preço e medo de perder cliente se pedir o que realmente merece.", color: "text-green-400", bg: "bg-green-400/10" },
          { icon: ArrowUpToLine, title: "Está Com Teto de Renda Invisível", desc: "Você chega sempre até o mesmo valor e nunca passa disso. Não importa quanto trabalhe ou quantas oportunidades apareçam, você bate no mesmo limite financeiro.", color: "text-amber-400", bg: "bg-amber-400/10" },
          { icon: Activity, title: "Ganha e Perde em Ciclo", desc: "Você consegue ganhar dinheiro, às vezes até bem, mas nunca segura. Chega uma grana e logo depois vem um gasto que te joga de volta para o mesmo lugar.", color: "text-purple-400", bg: "bg-purple-400/10" }
        ]
      }
    }
  };

  const currentContent = content[theme];

  return (
    <div className="min-h-screen bg-navy text-foreground overflow-x-hidden selection:bg-primary/30">
      
      <main>
        {/* Componentes recebem os textos dinâmicos (ou undefined para usar o padrão) */}
        <HeroCarta scrollToForm={scrollToForm} {...currentContent.hero} />
        
        <PainCarta {...currentContent.pain} />

        <PanoramaCarta 
          scrollToFormCarta={() => {
            // Sua função que rola a página até o form
            document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
          }}
          navigateToMapa={() => {
            // Redireciona a pessoa para a página de vendas oficial do Mapa
            window.location.href = "/"; 
          }}
        />

        <SolutionCarta scrollToForm={scrollToForm} {...currentContent.solution} />
        
        <ParaQuemECarta scrollToForm={scrollToForm} {...currentContent.paraQuemE} />
        
        {/* Estes continuam iguais para todos (O Produto é o mesmo) */}
        <OQueRecebeCarta scrollToForm={scrollToForm} />
        <ComoFuncionaCarta />
        <AuthorityCarta scrollToForm={scrollToForm} />
        
        <div ref={formRef}>
          <FormSection 
            tipo="gratis" 
            titulo="Solicitar Minha Carta Gratuita" 
            publico="adulto" 
          />
        </div>

        <FAQSection type={"gratis"} />
      </main>

      <Footer />
    </div>
  );
}