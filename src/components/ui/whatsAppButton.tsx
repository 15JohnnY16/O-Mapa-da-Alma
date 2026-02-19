import { useState } from "react";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Seu número e mensagens
  const phoneNumber = "5500000000000"; // COLOQUE SEU NÚMERO AQUI (apenas números)
  
  // Opções que o "Bot" vai oferecer
  const options = [
    { text: "Quero saber sobre a Carta Gratuita", msg: "Olá! Gostaria de saber mais sobre a Carta da Alma gratuita." },
    { text: "Quero o Mapa Completo", msg: "Olá! Tenho interesse no Mapa da Alma completo." },
    { text: "Tenho uma dúvida técnica", msg: "Olá! Estou com uma dúvida técnica no site." },
  ];

  const handleOpenWhatsapp = (message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* Janela do Chat (O "Bot") */}
      {isOpen && (
        <div className="bg-card border border-primary/20 rounded-2xl shadow-2xl w-[320px] md:w-[350px] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Cabeçalho do Chat */}
          <div className="bg-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary"></div>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Suporte Mapa da Alma</p>
                <p className="text-white/80 text-xs">Online agora</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Corpo do Chat */}
          <div className="p-4 bg-navy-light/50 h-[300px] flex flex-col gap-4 overflow-y-auto">
            
            {/* Mensagem do Bot */}
            <div className="flex gap-2">
               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <MessageCircle className="w-4 h-4 text-primary" />
               </div>
               <div className="bg-card border border-primary/10 p-3 rounded-2xl rounded-tl-none text-sm text-muted-foreground shadow-sm">
                  Olá! Sou a assistente virtual do Mapa da Alma. ✨ <br/>
                  Como posso te ajudar hoje?
               </div>
            </div>

            {/* Opções de Resposta */}
            <div className="flex flex-col gap-2 mt-auto">
              <p className="text-xs text-center text-muted-foreground mb-2">Escolha uma opção:</p>
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsapp(opt.msg)}
                  className="bg-white hover:bg-gray-50 text-navy-dark text-xs md:text-sm py-3 px-4 rounded-xl text-left border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                >
                  {opt.text}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Input Falso (só para parecer real) */}
          <div className="p-3 bg-card border-t border-border flex gap-2">
             <input 
                type="text" 
                placeholder="Digite uma mensagem..." 
                className="flex-1 bg-navy-light/50 border-none text-xs px-3 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-primary/30"
                disabled
             />
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-50">
                <Send className="w-4 h-4 text-white" />
             </div>
          </div>

        </div>
      )}

      {/* O Botão Flutuante (WhatsApp) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg shadow-green-900/20 transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        
        {/* Badge de Notificação */}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center font-bold">1</span>
            </span>
        )}

        {/* Tooltip Lateral */}
        <div className={`absolute right-full mr-4 bg-white text-navy px-4 py-2 rounded-xl shadow-lg whitespace-nowrap transition-all duration-300 origin-right ${isHovered && !isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
           <p className="text-sm font-bold">Dúvidas? Fale comigo!</p>
           {/* Setinha do tooltip */}
           <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-[8px] border-l-white border-b-8 border-b-transparent"></div>
        </div>
      </button>

    </div>
  );
}