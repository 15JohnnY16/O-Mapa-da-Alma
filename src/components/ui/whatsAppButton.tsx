import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User } from "lucide-react";

// Tipos para o Histórico de Chat
type ChatMessage = { id: string; sender: 'bot' | 'user'; text: string };

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Estados do Chatbot IA
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Contador de mensagens (A Trava de Vendas)
  const [messageCount, setMessageCount] = useState(0);
  const MAX_MESSAGES = 10;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mensagem inicial de boas-vindas
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: "welcome",
        sender: "bot",
        text: "Olá! Sou a assistente virtual do Mapa da Alma. Como posso te ajudar hoje?"
      }]);
    }
  }, [isOpen]);

  // Rola para o final do chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // FUNÇÃO MÁGICA: Transforma links de texto em botões clicáveis
  const renderTextWithLinks = (text: string) => {
    // Procura por qualquer coisa que comece com http:// ou https://
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-200 hover:text-white underline font-bold transition-colors"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Envia a mensagem para o seu PHP na HostGator
  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping || messageCount >= MAX_MESSAGES) return;

    const userMessage = inputText.trim();
    setInputText(""); // Limpa o campo
    
    // Adiciona a mensagem do usuário na tela
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userMessage }]);
    setMessageCount(prev => prev + 1);
    setIsTyping(true);

    try {
      const response = await fetch("https://omapadaalma.com/api/chat_ia.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensagem: userMessage })
      });

      const data = await response.json();

      // --- SIMULADOR DE DIGITAÇÃO HUMANA ---
      // Cria um tempo de espera aleatório entre 3000ms (3s) e 5000ms (5s)
      const tempoDeEspera = Math.floor(Math.random() * 2000) + 3000;
      await new Promise(resolve => setTimeout(resolve, tempoDeEspera));
      // -----------------------------------------------------------

      if (data.resposta) {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: data.resposta }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: "Desculpe, a conexão falhou por um instante. Pode repetir?" }]);
      }
    } catch (error) {
      console.error("Erro ao chamar IA:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: "Houve uma pequena falha na minha conexão. Tente novamente!" }]);
    } finally {
      setIsTyping(false);
    }
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
                <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.sender === 'user' ? 'bg-navy border-navy-light' : 'bg-primary/10 border-primary/20'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <MessageCircle className="w-4 h-4 text-primary" />}
                  </div>

                  {/* Texto (AGORA COM A FUNÇÃO DE LINK) */}
                  <div className={`p-3 text-sm shadow-sm whitespace-pre-wrap break-words ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-none' 
                      : 'bg-card border border-primary/10 text-muted-foreground rounded-2xl rounded-tl-none'
                  }`}>
                    {renderTextWithLinks(msg.text)}
                  </div>
                </div>
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
          
          {/* Rodapé Dinâmico */}
          {messageCount >= MAX_MESSAGES ? (
            <div className="p-4 bg-card border-t border-border flex flex-col gap-2 items-center text-center animate-in fade-in zoom-in duration-300">
              <p className="text-sm font-bold text-primary">Chegou a hora de dar o próximo passo.</p>
              <p className="text-xs text-muted-foreground mb-1">
                {typeof window !== 'undefined' && window.location.pathname.includes('/carta')
                  ? "Preencha seus dados para receber sua leitura gratuita."
                  : "Para se aprofundar de verdade, você precisa do seu mapa completo."}
              </p>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  const currentUrl = window.location.href.split('#')[0];
                  window.location.href = currentUrl + '#formulario';
                }}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {typeof window !== 'undefined' && window.location.pathname.includes('/carta') 
                  ? "Fazer minha Carta da Alma" 
                  : "Fazer meu Mapa da Alma"}
              </button>
            </div>
          ) : (
            <div className="p-3 bg-card border-t border-border flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escreva sua dúvida..."
                className="flex-1 bg-navy-light/10 border border-border text-sm px-4 py-2.5 rounded-full text-foreground outline-none focus:border-primary/50 transition-colors"
                disabled={isTyping}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 disabled:opacity-50 hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-white relative -left-[1px] top-[1px]" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* Botão Flutuante */}
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