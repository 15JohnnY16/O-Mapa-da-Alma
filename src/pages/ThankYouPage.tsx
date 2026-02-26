import { useEffect, useState } from "react";
import { Mail, MessageCircle, Star, Gift, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom"; 

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Pega os parâmetros da URL
  // Exemplo: seite.com/obrigado?name=Joao&tipo=venda
  const userName = searchParams.get("name") || "Viajante";
  const type = searchParams.get("tipo") || "amostra"; // 'venda' ou 'amostra'
  const token = searchParams.get("token") || "";

  const [isValidAccess, setIsValidAccess] = useState(false);

  // Configurações dinâmicas de Texto baseadas no tipo
  const content = {
    venda: {
      title: "Compra Confirmada!",
      subtitle: "Seu Mapa da Alma completo já está sendo preparado.",
      description: "Em breve você terá em mãos um guia profundo sobre sua verdadeira essência.",
      icon: <Star className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 fill-yellow-500/20" />,
      color: "text-yellow-500",
      bgIcon: "bg-yellow-500/10 border-yellow-500/30",
      steps: [
        "Você receberá o acesso vitalício no seu e-mail em até 5 dias úteis.",
        "Verifique sua caixa de SPAM ou Promoções."
      ],
      value: 197.00
    },
    amostra: {
      title: "Parabéns!",
      subtitle: "Você acaba de garantir sua Carta da Alma.",
      description: "Você tomou uma decisão inteligente. A Carta da Alma já ajudou centenas de pessoas a finalmente nomear os padrões que repetiam sem entender por quê. Nas próximas 48 horas, você receberá uma leitura personalizada que vai revelar seus padrões centrais que você vai se reconhecer na hora.",
      icon: <Gift className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
      color: "text-primary",
      bgIcon: "bg-primary/10 border-primary/30",
      steps: [
        "Verifique a caixa de entrada do email que você informou. Lembre-se de olhar também nas abas de spam e promoções, às vezes a mensagem cai lá.",
        "Adicione o remetente aos seus contatos para garantir que você receba todos os materiais e atualizações sem perder nada na caixa de entrada.",
        "Siga as instruções do email para acessar sua Carta da Alma. Você vai receber um link exclusivo com sua leitura completa em até 48 horas."
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
    <section className="min-h-screen bg-navy-light relative flex items-center justify-center p-4 py-12 overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 constellation-pattern opacity-20 pointer-events-none" />
      
      <Card className="relative z-10 max-w-3xl w-full bg-card/90 backdrop-blur-md border-primary/20 p-8 md:p-12 text-center shadow-2xl animate-in fade-in zoom-in duration-500">
        
        {/* Ícone Dinâmico */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${type === 'venda' ? 'bg-yellow-500' : 'bg-primary'}`} />
            <div className={`relative p-4 rounded-full border ${currentContent.bgIcon}`}>
              {currentContent.icon}
            </div>
          </div>
        </div>

        {/* Textos Dinâmicos */}
        <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
          {currentContent.title}
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-foreground mb-4">
          Olá, <span className={currentContent.color}>{userName}</span>! {currentContent.subtitle}
        </h2>
        
        {/* Descrição Principal Adicionada */}
        <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
          {currentContent.description}
        </p>

        {/* Box de Instruções Dinâmico */}
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 mb-8 text-left space-y-4">
          <h3 className="text-foreground font-medium flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            Próximos passos:
          </h3>
          <ul className="space-y-4">
            {currentContent.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: step.replace(/spam e promoções|SPAM ou Promoções/gi, '<strong>$&</strong>') }} />
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Button 
            className="w-full md:w-auto h-12 px-8 text-base gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
            onClick={() => window.open("https://mail.google.com", "_blank")}
          >
            <Mail className="w-4 h-4" />
            Abrir meu E-mail
          </Button>
        </div>

        {/* Rodapé de Suporte */}
        <div className="pt-6 border-t border-border/50 text-sm text-muted-foreground">
          Alguma dúvida? Fale com nosso suporte: <a href="mailto:contato@omapadaalma.com" className="text-primary hover:underline font-medium">contato@omapadaalma.com</a>
        </div>

      </Card>
    </section>
  );
}