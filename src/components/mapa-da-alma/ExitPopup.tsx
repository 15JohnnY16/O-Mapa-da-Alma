import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ExitPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Lógica inteligente para definir o destino
  const isJovem = location.pathname.includes('jovem');
  // Se for jovem vai para /jovem-amostra, se não vai para /amostra
  // O final "#formulario" é o que faz a mágica da rolagem
  const destinoUrl = isJovem ? '/jovem-amostra#formulario' : '/amostra#formulario';

  useEffect(() => {
    // Função que detecta a saída do mouse
    const handleMouseLeave = (e: MouseEvent) => {
      // Se o mouse sair pelo TOPO da página (clientY < 0)
      if (e.clientY < 0) {
        // Verifica se o popup já foi mostrado antes para não irritar o usuário
        const hasSeenPopup = localStorage.getItem('astro_exit_popup');
        
        if (!hasSeenPopup) {
          setIsVisible(true);
          // Marca que o usuário já viu
          localStorage.setItem('astro_exit_popup', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // TRAVA DE SEGURANÇA: Não mostrar se já estiver nas páginas de amostra
  if (location.pathname.includes('amostra')) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={() => setIsVisible(false)}>×</button>
        
        <h2 className="popup-title">Espere! Não vá embora ainda...</h2>
        
        <p className="popup-text">
          Sinto que sua ancestralidade tem uma mensagem urgente para você hoje.
          Você pode não estar pronto para o Mapa Completo agora, mas não ignore os sinais.
        </p>

        <p className="popup-subtext">
          Receba uma análise preliminar da sua Carta Ancestral <strong>gratuitamente</strong>.
        </p>

        {/* Substitua '/sua-nova-pagina' pelo link da página nova que você criou */}
        <a href={destinoUrl} className="popup-button">
          Quero Ler Minha Carta Grátis
        </a>
        
        <p className="popup-footer" onClick={() => setIsVisible(false)}>
          Não, prefiro continuar repetindo padrões.
        </p>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .popup-content {
          background: #0f1115; /* Fundo escuro igual seu site */
          border: 1px solid #d4af37; /* Borda dourada */
          padding: 40px;
          border-radius: 12px;
          text-align: center;
          max-width: 500px;
          width: 90%;
          position: relative;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }

        .popup-title {
          color: #d4af37;
          font-family: 'Playfair Display', serif; /* Fonte do seu título */
          font-size: 28px;
          margin-bottom: 15px;
        }

        .popup-text {
          color: #e0e0e0;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .popup-subtext {
           color: #fff;
           margin-bottom: 30px;
        }

        .popup-button {
          display: inline-block;
          background: #d4af37;
          color: #000;
          font-weight: bold;
          padding: 15px 30px;
          border-radius: 5px;
          text-decoration: none;
          font-size: 18px;
          transition: transform 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .popup-button:hover {
          transform: scale(1.05);
          background: #f5cc50;
        }

        .popup-footer {
          margin-top: 15px;
          font-size: 12px;
          color: #666;
          cursor: pointer;
          text-decoration: underline;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          color: #666;
          font-size: 30px;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ExitPopup;