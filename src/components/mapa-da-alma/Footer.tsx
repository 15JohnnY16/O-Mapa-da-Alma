import { MessageCircle, Mail, Heart } from "lucide-react";
import { translations as t } from "@/lib/i18n";
import LegalModal from "./LegalModal";

const Footer = () => {
  return (
    <footer className="py-10 md:py-12 border-t border-border bg-navy-light/30">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Grid ajustado: gap-8 no mobile, mas gap-12 no desktop para separar melhor as colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-foreground">Mapa da Alma</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="leading-relaxed">
                <strong className="text-foreground font-medium">O que é:</strong> Um livro 100% personalizado que traduz seu mapa de nascimento em linguagem simples e entrega clareza + um plano prático de 90 dias para vida, trabalho, dinheiro e relacionamentos.
              </li>
              
              <li className="leading-relaxed">
                <strong className="text-foreground font-medium">Como funciona:</strong> Você envia seus dados de nascimento, nós produzimos a leitura completa e você recebe o material final digital para aplicar no seu dia a dia.
              </li>
              
              <li className="leading-relaxed">
                <strong className="text-foreground font-medium">Quem somos:</strong> Somos a equipe do Mapa da Alma, dedicada a transformar astrologia em autoconhecimento prático, com uma entrega profunda, clara e aplicável.
              </li>
            </ul> 
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">{t.footer.contactTitle}</h4>
            <div className="space-y-3"> {/* Aumentei levemente o espaço entre os links */}
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                {/* Ícone com leve brilho no hover */}
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                WhatsApp
              </a>
              <a
                href="mailto:contato@omapadaalma.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                contato@omapadaalma.com
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">{t.footer.legalTitle}</h4>
            
            {/* Botões alinhados à esquerda (items-start) */}
            <div className="flex flex-col items-start space-y-2">
              
              <LegalModal 
                triggerText={t.footer.terms}
                title="Termos de Uso"
                type="terms"
              />

              <LegalModal 
                triggerText={t.footer.privacy}
                title="Política de Privacidade"
                type="privacy"
              />

              <LegalModal 
                triggerText={t.footer.refund}
                title="Política de Trocas e Devoluções"
                type="refund"
              />
              
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground text-center md:text-left">
            <p>{t.footer.rights}</p>
            <p className="flex items-center gap-1">
              {t.footer.madeWith} <Heart className="w-4 h-4 text-primary fill-primary/20" /> {t.footer.forWomen}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;