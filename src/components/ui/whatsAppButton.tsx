import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, ChevronRight, User } from "lucide-react";

// --- FLUXO DE CONVERSA DO BOT ---
type Option = { text: string; nextStep?: string; isWhatsappRedirect?: boolean; waMessage?: string };
type BotStep = { message: string; options: Option[] };

const botFlow: Record<string, BotStep> = {
  start: {
    message: "Olá! Sou a assistente virtual do Mapa da Alma. ✨ Como posso te ajudar hoje?",
    options: [
      { text: "Como funciona a Carta Gratuita?", nextStep: "sobre_carta" },
      { text: "O que vem no Mapa Completo?", nextStep: "sobre_mapa" },
      { text: "Dúvidas sobre Prazo/Pagamento", nextStep: "suporte" },
      { text: "Falar com um atendente", nextStep: "falar_humano" }
    ]
  },
  sobre_carta: {
    message: "A Carta Gratuita é um resumo inicial do seu Mapa Astral. Nela você descobre seu Sol, Lua e Ascendente! Enviamos diretamente para você. 🌙",
    options: [
      { text: "Como eu peço a minha?", nextStep: "pedir_carta" },
      { text: "Voltar ao início", nextStep: "start" }
    ]
  },
  pedir_carta: {
    message: "É super simples! Basta preencher o formulário no nosso site informando seus dados de nascimento. Quer ajuda com isso?",
    options: [
      { text: "Sim, me ajude no WhatsApp", nextStep: "falar_humano", waMessage: "Olá! Gostaria de ajuda para pedir minha Carta Gratuita." },
      { text: "Não, obrigado(a).", nextStep: "start" }
    ]
  },
  sobre_mapa: {
    message: "O Mapa Completo é uma análise profunda feita artesanalmente. Ele mostra seus potenciais, desafios, vida amorosa, carreira e propósito de vida! 🌌",
    options: [
      { text: "Quero fazer o meu!", nextStep: "falar_humano", waMessage: "Olá! Quero garantir meu Mapa da Alma Completo." },
      { text: "Voltar ao início", nextStep: "start" }
    ]
  },
  suporte: {
    message: "Nosso prazo de entrega para análises completas é de até 5 dias úteis. Aceitamos PIX e Cartão em até 12x. Ficou com mais alguma dúvida? 💳",
    options: [
      { text: "Sim, quero falar no WhatsApp", nextStep: "falar_humano", waMessage: "Olá! Tenho uma dúvida sobre prazos e pagamentos." },
      { text: "Não, voltar ao início", nextStep: "start" }
    ]
  },
  falar_humano: {
    message: "Perfeito! Vou te transferir para um de nossos especialistas no WhatsApp. Clique no botão abaixo para iniciar a conversa: 👇",
    options: [
      { text: "👉 Ir para o WhatsApp", isWhatsappRedirect: true, waMessage: "Olá! Vim pelo site e gostaria de atendimento." },
      { text: "Cancelar e voltar", nextStep: "start" }
    ]
  }
};

// Tipos para o Histórico de Chat
type ChatMessage = { id: string; sender: 'bot' | 'user'; text: string; isOptions?: boolean; options?: Option[] };

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Estados do Chatbot
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const phoneNumber = "55061992232186";

  // Inicia o chat quando abre a janela pela primeira vez
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadStep('start');
    }
  }, [isOpen]);

  // Rola para o final do chat sempre que uma nova mensagem entra
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const loadStep = (stepKey: string) => {
    const step = botFlow[stepKey];
    if (!step) return;

    // Remove as opções da mensagem anterior (para não ficarem botões velhos na tela)
    setMessages(prev => prev.map(msg => ({ ...msg, isOptions: false })));

    setIsTyping(true);
    
    // Simula o tempo de digitação do bot (800ms)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'bot', text: step.message, isOptions: true, options: step.options }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleOptionClick = (option: Option) => {
    // 1. Adiciona a escolha do usuário na tela
    setMessages(prev => [
      ...prev.map(msg => ({ ...msg, isOptions: false })), // Esconde as opções antigas
      { id: Date.now().toString(), sender: 'user', text: option.text }
    ]);

    // 2. Verifica se é para redirecionar ou continuar o fluxo
    if (option.isWhatsappRedirect) {
      setTimeout(() => handleOpenWhatsapp(option.waMessage || "Olá! Vim pelo site."), 500);
    } else if (option.nextStep) {
      loadStep(option.nextStep);
    }
  };

  const handleOpenWhatsapp = (message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* Janela do Chat */}
      {isOpen && (
        <div className="bg-card border border-primary/20 rounded-2xl shadow-2xl w-[320px] md:w-[360px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Cabeçalho do Chat */}
          <div className="bg-primary p-4 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary"></div>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Assistente Virtual</p>
                <p className="text-white/80 text-xs">Online agora</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Corpo do Chat */}
          <div className="p-4 bg-navy-light/30 h-[380px] overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Balão de Mensagem */}
                <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.sender === 'user' ? 'bg-navy border-navy-light' : 'bg-primary/10 border-primary/20'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <MessageCircle className="w-4 h-4 text-primary" />}
                  </div>

                  {/* Texto */}
                  <div className={`p-3 text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-none' 
                      : 'bg-card border border-primary/10 text-muted-foreground rounded-2xl rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>

                {/* Botões de Opção (Só aparecem na última mensagem do bot se houver) */}
                {msg.isOptions && msg.options && (
                  <div className="flex flex-col gap-2 mt-2 w-full pl-10">
                    <p className="text-[11px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Escolha uma opção:</p>
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        className={`text-left text-xs md:text-sm py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group border ${
                          opt.isWhatsappRedirect 
                            ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white border-transparent' 
                            : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200' // FIX: Cor do texto alterada para cinza escuro
                        }`}
                      >
                        <span className="font-medium">{opt.text}</span>
                        {!opt.isWhatsappRedirect && <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Indicador de Digitação */}
            {isTyping && (
              <div className="flex gap-2 items-end">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-card border border-primary/10 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Rodapé Falso */}
          <div className="p-3 bg-card border-t border-border flex items-center gap-2">
             <div className="flex-1 bg-navy-light/20 border border-border/50 text-xs px-3 py-2.5 rounded-full text-muted-foreground flex items-center">
               Escolha uma das opções acima...
             </div>
             <div className="w-9 h-9 rounded-full bg-primary/50 flex items-center justify-center cursor-not-allowed">
                <Send className="w-4 h-4 text-white" />
             </div>
          </div>

        </div>
      )}

      {/* Botão Flutuante (Permanece Igual) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg shadow-green-900/20 transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-8 h-8" />
        
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center font-bold">1</span>
            </span>
        )}

        <div className={`absolute right-full mr-4 bg-white text-navy px-4 py-2 rounded-xl shadow-lg whitespace-nowrap transition-all duration-300 origin-right ${isHovered && !isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
           <p className="text-sm font-bold">Dúvidas? Fale comigo!</p>
           <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-[8px] border-l-white border-b-8 border-b-transparent"></div>
        </div>
      </button>

    </div>
  );
}