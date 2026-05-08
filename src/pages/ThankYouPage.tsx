import { useEffect, useState } from "react";
import { Mail, Gift, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom"; 

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Pega os parâmetros da URL
  const fullName = searchParams.get("name") || "Viajante";
  // Pega apenas o primeiro nome (divide pelo espaço e pega o item 0)
  const firstName = fullName.split(" ")[0];

  const type = searchParams.get("tipo") || "amostra"; // 'venda' ou 'amostra'
  const token = searchParams.get("token") || "";

  const [isValidAccess, setIsValidAccess] = useState(false);

  // Configurações dinâmicas de Texto baseadas no tipo
  const content = {
    venda: {
      title: "Recebemos o pedido do seu Mapa da Alma!",
      subtitle: "Parabéns por escolher se conhecer melhor. Essa decisão já diz muito sobre você. Sua Carta da Alma vai revelar os padrões que moldam sua vida e finalmente colocar palavras no que você sempre sentiu.",
      icon: <Gift className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
      color: "text-primary",
      bgIcon: "bg-primary/10 border-primary/30",
      steps: [
        "Seu Mapa da Alma está sendo preparado. Você receberá sua leitura personalizada em até 5 dias úteis. Pode ficar tranquilo(a), ela virá!",
        "Às vezes o email pode cair em spam ou promoções, então vale ficar de olho nessas pastas também.",
        "Para garantir que nada se perca, adicione nosso remetente à sua lista de contatos."
      ],
      value: 197.00
    },
    amostra: {
      title: "Recebemos o pedido da sua Carta da Alma!",
      subtitle: "Parabéns por escolher se conhecer melhor. Essa decisão já diz muito sobre você. Sua Carta da Alma vai revelar os padrões que moldam sua vida e finalmente colocar palavras no que você sempre sentiu.",
      icon: <Gift className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
      color: "text-primary",
      bgIcon: "bg-primary/10 border-primary/30",
      steps: [
        "Sua Carta da Alma está sendo preparada. Você receberá sua leitura personalizada em até 48 horas. Pode ficar tranquilo(a), ela virá!",
        "Às vezes o email pode cair em spam ou promoções, então vale ficar de olho nessas pastas também.",
        "Para garantir que nada se perca, adicione nosso remetente à sua lista de contatos."
      ],
      value: 0.00
    }
  };

  const currentContent = type === 'venda' ? content.venda : content.amostra;

  // === ÁREA DE RASTREAMENTO INTELIGENTE ===
  useEffect(() => {
    // 1. SEGURANÇA: Verifica se o token existe e parece válido (MD5 tem 32 chars)
    if (!token || token.length !== 32) {
      console.warn("⛔ Acesso direto ou inválido detectado. Pixel bloqueado.");
      // Opcional: Redirecionar para home após 3 segundos
      const timer = setTimeout(() => navigate("/"), 4000); 
      return () => clearTimeout(timer); 
    }

    // 2. DISPARA PIXELS (Só entra aqui se tiver token)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] Pixel Disparado: ${type} (R$ ${currentContent.value})`);
      return;
    }

    // 1. META ADS (Facebook)
    // @ts-ignore
    if (window.fbq) {
      if (type === 'venda') {
        // @ts-ignore
        window.fbq('track', 'Purchase', { 
          currency: "BRL", 
          value: currentContent.value
        });
      }
    }

    // 2. GOOGLE ADS
    // @ts-ignore
    if (window.gtag) {
      if (type === 'venda') {
        // @ts-ignore
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17926087733/t_eLCKWmsvEbELXI6eNC', // Substitua pelo Label de Compra
          'value': currentContent.value,
          'currency': 'BRL'
        });
      }
    }
  }, [type, token, navigate, currentContent.value]);

  // === RENDERIZAÇÃO CONDICIONAL ===
  if (!token || token.length !== 32) {
    return (
      <section className="min-h-screen bg-navy-light flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-card/90 border-destructive/50 p-8 text-center shadow-2xl backdrop-blur-md">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>
          </div>
          <h1 className="text-2xl text-foreground font-serif mb-2">Acesso Restrito</h1>
          <p className="text-muted-foreground mb-6">
            Esta página é exclusiva para confirmação de pedidos. Você será redirecionado para o início.
          </p>
          <Button onClick={() => navigate("/")} variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
            Voltar para o Início
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative flex flex-col items-center p-4 py-12 md:py-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(220 30% 6%) 0%, hsl(220 25% 10%) 100%)' }}
    >
      {/* Background Decorativo */}
      <div className="absolute inset-0 constellation-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* ✦ Ícone de Presente — Acima de tudo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-full animate-ping opacity-15"
              style={{ background: 'radial-gradient(circle, hsl(43 56% 52% / 0.4), transparent 70%)' }}
            />
            <div
              className="relative p-5 rounded-full border border-primary/40"
              style={{ background: 'hsl(43 56% 52% / 0.08)' }}
            >
              {currentContent.icon}
            </div>
          </div>
        </div>

        {/* Saudação + Título */}
        <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-1">
          Olá, {firstName}!
        </p>
        <h1 className="font-serif text-2xl md:text-3xl text-foreground text-center leading-snug mb-8">
          {currentContent.title.split(' ').map((word, i, arr) => {
            // Destaca "Carta da Alma" ou "Mapa da Alma" em dourado
            const fullTitle = currentContent.title;
            const highlightTerms = ['Carta da Alma', 'Mapa da Alma'];
            const matchedTerm = highlightTerms.find(term => fullTitle.includes(term));
            if (matchedTerm) {
              const startIdx = fullTitle.indexOf(matchedTerm);
              const beforeHighlight = fullTitle.slice(0, startIdx);
              const highlight = matchedTerm;
              const afterHighlight = fullTitle.slice(startIdx + matchedTerm.length);
              return i === 0 ? (
                <span key="full">
                  {beforeHighlight}
                  <br />
                  <span className="text-gradient-gold">{highlight}</span>
                  {afterHighlight}
                </span>
              ) : null;
            }
            return i === 0 ? <span key="full">{fullTitle}</span> : null;
          })}
        </h1>

        {/* Box dourado — Subtítulo / Descrição */}
        <div
          className="w-full rounded-xl p-5 md:p-6 mb-6 text-left"
          style={{
            background: 'linear-gradient(135deg, hsl(220 25% 12% / 0.9), hsl(220 25% 14% / 0.7))',
            border: '1px solid hsl(43 56% 52% / 0.25)',
            boxShadow: '0 0 30px hsl(43 56% 52% / 0.05), inset 0 1px 0 hsl(43 56% 52% / 0.08)',
          }}
        >
          <p className="text-sm md:text-base leading-relaxed" style={{ color: 'hsl(43 56% 72%)' }}>
            <strong className="text-foreground">Parabéns por escolher se conhecer melhor.</strong>{' '}
            {currentContent.subtitle.replace('Parabéns por escolher se conhecer melhor. ', '')}
          </p>
        </div>

        {/* Painel de Instruções */}
        <div
          className="w-full rounded-xl p-5 md:p-6 mb-8 text-left"
          style={{
            background: 'linear-gradient(135deg, hsl(220 25% 11%), hsl(220 25% 13%))',
            border: '1px solid hsl(220 15% 22%)',
            boxShadow: '0 8px 32px hsl(220 30% 4% / 0.5)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-medium text-foreground tracking-wide">O que acontece agora</span>
          </div>

          {/* Steps */}
          <ul className="space-y-5">
            {currentContent.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                  style={{
                    background: 'hsl(43 56% 52% / 0.18)',
                    color: 'hsl(43 56% 60%)',
                    border: '1px solid hsl(43 56% 52% / 0.3)',
                  }}
                >
                  {index + 1}
                </span>
                <span
                  className="text-sm md:text-base text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: step
                      .replace(/spam ou promoções|spam e promoções/gi, '<strong style="color: hsl(40 33% 96%)">$&</strong>')
                      .replace(/(Sua (?:Carta|Mapa) da Alma está sendo preparad[ao]\.)/i, '<strong style="color: hsl(40 33% 96%)">$1</strong>')
                  }}
                />
              </li>
            ))}
          </ul>

          {/* Nota final dentro do painel */}
          <div
            className="mt-5 rounded-lg p-4 text-xs md:text-sm leading-relaxed text-muted-foreground"
            style={{
              background: 'hsl(220 25% 9% / 0.7)',
              border: '1px solid hsl(220 15% 20% / 0.6)',
            }}
          >
            Não precisa fazer nada agora. Seu email já está registrado e sua{' '}
            {type === 'venda' ? 'Mapa' : 'Carta'} está a caminho — fique de olho nas próximas{' '}
            {type === 'venda' ? '5 dias úteis' : '48 horas'}.
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center w-full mb-8">
          <Button
            className="h-12 px-10 text-base gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-lg transition-all duration-300 hover:shadow-primary/30 hover:shadow-xl"
            style={{ boxShadow: '0 4px 20px hsl(43 56% 52% / 0.25)' }}
            onClick={() => window.open("https://mail.google.com", "_blank")}
          >
            <Mail className="w-4 h-4" />
            Abrir meu E-mail
          </Button>
        </div>

        {/* Rodapé de Suporte */}
        <div className="text-center text-xs md:text-sm text-muted-foreground/70">
          Alguma dúvida? Fale com nosso suporte:{' '}
          <a href="mailto:suporte@omapadaalma.com" className="text-primary/80 hover:text-primary hover:underline font-medium transition-colors">
            contato@omapadaalma.com
          </a>
        </div>
      </div>
    </section>
  );
}