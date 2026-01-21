import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface CheckoutButtonProps {
  mpLink: string; // O link que vais gerar no MercadoPago
  text?: string;
  className?: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  mpLink,
  text,
  className
}) => {
  const { t } = useLanguage();
  const buttonText = text || t.checkout.defaultText;

  const handleCheckout = () => {
    // Abre o link do MercadoPago numa nova aba
    if (mpLink) {
      window.open(mpLink, '_blank');
    } else {
      console.warn("Link de pagamento ainda não definido");
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Button
        onClick={handleCheckout}
        size="lg"
        className="text-lg font-bold py-8 px-10 shadow-xl hover:scale-105 transition-transform duration-300 animate-pulse bg-green-600 hover:bg-green-700 text-white"
      >
        {buttonText}
      </Button>

      {/* Texto de segurança abaixo do botão aumenta a confiança */}
      <span className="text-xs text-gray-500 flex items-center gap-1">
        {t.checkout.scan}
      </span>
    </div>
  );
};

export default CheckoutButton;