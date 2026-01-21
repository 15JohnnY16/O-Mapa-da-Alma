import { MessageCircle, Mail, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-foreground">Mapa da Alma</h3>
            <p className="text-sm text-muted-foreground">
              {t.footer.description}
            </p>
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
                href="mailto:contato@mapadaalma.com.br"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                contato@mapadaalma.com.br
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">{t.footer.legalTitle}</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.footer.terms}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.footer.privacy}
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t.footer.refund}
              </a>
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
