import { MessageCircle, Mail, Heart } from "lucide-react";
import { translations as t } from "@/lib/i18n";
import LegalModal from "./LegalModal";

const Footer = () => {


  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
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
            <div className="space-y-2">
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="mailto:contato@omapadaalma.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                contato@omapadaalma.com
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">{t.footer.legalTitle}</h4>
            
            {/* Adicionei 'flex flex-col items-start' para os botões ficarem um embaixo do outro alinhados à esquerda */}
            <div className="flex flex-col items-start space-y-2">
              
              <LegalModal 
                triggerText={t.footer.terms} // Texto do botão (Vem da tradução)
                title="Termos de Uso"        // Título do Modal
                type="terms"                 // Tipo (para carregar o texto correto)
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>{t.footer.rights}</p>
            <p className="flex items-center gap-1">
              {t.footer.madeWith} <Heart className="w-4 h-4 text-primary" /> {t.footer.forWomen}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
