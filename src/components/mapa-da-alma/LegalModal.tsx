import React, { useState, useEffect } from "react";
import { X, ShieldCheck, FileText, RefreshCcw } from "lucide-react";

interface LegalModalProps {
  triggerText: string;
  title: string;
  type: "privacy" | "terms" | "refund";
}

const LegalModal: React.FC<LegalModalProps> = ({ triggerText, title, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Fecha com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Impede scroll do fundo quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Conteúdos (Você pode substituir pelos seus textos reais depois)
  const getContent = () => {
    switch (type) {
      case "privacy":
        return (
          <div className="space-y-6">
            <p className="font-bold text-foreground">O Mapa da Alma (RFJM LTDA)</p>
            <p>A RFJM LTDA, com sede em Brasília/DF, responsável pelo produto O Mapa da Alma, respeita sua privacidade e trata seus dados pessoais com segurança e transparência, conforme a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
            <p>Ao acessar este site e/ou adquirir o Mapa da Alma, você concorda com esta Política.</p>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">1. Quem controla seus dados</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Controlador:</strong> RFJM LTDA</li>
                <li><strong>Canal oficial:</strong> <a href="mailto:contato@omapadaalma.com" className="text-primary hover:underline">contato@omapadaalma.com</a></li>
                <li><strong>Local:</strong> Brasília/DF</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-foreground">2. Quais dados coletamos</h4>
              <p>Coletamos apenas os dados necessários para produção do material, entrega, suporte, pagamento e melhorias do site, podendo incluir:</p>
              
              <div className="pl-2 space-y-2">
                <p><strong className="text-foreground">a) Dados de identificação e contato:</strong> Nome completo, E-mail, WhatsApp, Gênero (quando informado).</p>
                <p><strong className="text-foreground">b) Dados para personalização do Mapa da Alma:</strong> Data, horário e cidade/UF de nascimento.</p>
                <p><strong className="text-foreground">c) Dados para pagamento:</strong> Informações necessárias para processar pagamento via Asaas (status, identificação do pedido). O CPF pode ser solicitado para viabilizar pagamento via boleto.</p>
                <p className="text-xs italic bg-primary/5 p-2 rounded border border-primary/20">Importante: pagamentos são processados pela Asaas. Em regra, não armazenamos dados completos de cartão.</p>
                <p><strong className="text-foreground">d) Dados de navegação e marketing:</strong> Endereço IP, tipo de dispositivo, cookies e identificadores (Google Analytics e Meta Pixel).</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">3. Para que usamos seus dados (finalidades)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Produzir o Mapa da Alma (personalização);</li>
                <li>Entregar o material digital e comunicar status;</li>
                <li>Prestar suporte, garantia e reembolso;</li>
                <li>Processar pagamento via Asaas e prevenir fraudes;</li>
                <li>Cumprir obrigações legais;</li>
                <li>Analisar desempenho do site (Google Analytics);</li>
                <li>Mensurar anúncios e otimizar campanhas (Meta Pixel), quando aplicável;</li>
                <li>Enviar comunicações sobre produtos da RFJM LTDA (se autorizado).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">4. Bases legais (LGPD)</h4>
              <p>O tratamento pode ocorrer com base em:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Execução de contrato;</li>
                <li>Cumprimento de obrigação legal/regulatória;</li>
                <li>Legítimo interesse (segurança, prevenção a fraudes, melhoria de processos);</li>
                <li>Consentimento (quando exigido).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">5. Com quem compartilhamos seus dados</h4>
              <p>Podemos compartilhar dados apenas quando necessário com:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Asaas:</strong> Processamento de pagamento, boleto e antifraude;</li>
                <li>Serviços de e-mail e atendimento;</li>
                <li><strong>Google Analytics:</strong> Métricas de navegação;</li>
                <li><strong>Meta (Meta Pixel):</strong> Mensuração de anúncios e conversões;</li>
                <li>Hospedagem e segurança do site;</li>
                <li>Autoridades (quando exigido por lei).</li>
              </ul>
              <p className="font-medium text-foreground">Não vendemos seus dados.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">6. Cookies, Meta Pixel e Google Analytics</h4>
              <p>Utilizamos cookies para funcionamento, segurança, métricas (Google Analytics) e otimização de anúncios (Meta Pixel).</p>
              <p><strong>Como gerenciar:</strong> Você pode ajustar permissões no seu navegador. O bloqueio pode afetar funcionalidades.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">7. Por quanto tempo guardamos seus dados</h4>
              <p>Mantemos seus dados pelo tempo necessário para produção, entrega, suporte, garantia de 7 dias e cumprimento de obrigações legais. Após esse período, podem ser excluídos ou anonimizados.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">8. Segurança da informação</h4>
              <p>Adotamos medidas razoáveis de segurança (técnicas e organizacionais) para reduzir riscos. Nenhum sistema é 100% inviolável; caso haja incidente relevante, adotaremos medidas conforme a LGPD.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">9. Seus direitos como titular</h4>
              <p>Você pode solicitar a qualquer momento pelo e-mail <a href="mailto:contato@omapadaalma.com" className="text-primary hover:underline">contato@omapadaalma.com</a>:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Confirmação e acesso;</li>
                <li>Correção de dados;</li>
                <li>Exclusão (quando aplicável);</li>
                <li>Informação sobre compartilhamentos;</li>
                <li>Revogação do consentimento.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">10. Transferência internacional</h4>
              <p>Ferramentas como Google Analytics e Meta podem envolver tratamento em servidores fora do Brasil. Adotamos medidas para que o tratamento seja compatível com a LGPD.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">11. Atualizações desta Política</h4>
              <p>Esta Política pode ser atualizada para refletir melhorias ou mudanças legais. A versão vigente será sempre a publicada nesta página.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">12. Contato</h4>
              <p>Canal oficial para privacidade e suporte: <a href="mailto:contato@omapadaalma.com" className="text-primary hover:underline">contato@omapadaalma.com</a></p>
            </div>

            <p className="text-xs text-muted-foreground pt-4 border-t border-white/10">Última atualização: 29/01/2026</p>
          </div>
        );
      case "refund":
        return (
          <div className="space-y-6">
            <p className="font-bold text-foreground">Política de Reembolso</p>
            <p>A RFJM LTDA, responsável pelo produto digital O Mapa da Alma, acredita em uma experiência segura e transparente. Por isso, oferecemos uma política de reembolso clara, com base no Código de Defesa do Consumidor para compras online.</p>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">1. Prazo de Garantia (7 dias)</h4>
              <p>O cliente tem 7 (sete) dias corridos, contados a partir do recebimento do Mapa da Alma, para solicitar reembolso integral caso entenda que o material não faz sentido, não atenda às expectativas ou deseje desistir da compra.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">2. Como solicitar o reembolso</h4>
              <p>Para solicitar, envie um e-mail para <a href="mailto:contato@omapadaalma.com" className="text-primary hover:underline">contato@omapadaalma.com</a> com o assunto: <strong>“Reembolso O Mapa da Alma”</strong> e informe:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nome completo;</li>
                <li>E-mail utilizado na compra;</li>
                <li>Data de recebimento do Mapa;</li>
                <li>(Opcional) Motivo do pedido — você pode explicar em uma frase, mas não é obrigatório.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">3. Condições para elegibilidade</h4>
              <p>O reembolso será concedido quando:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>O pedido for feito dentro do prazo de 7 dias corridos após o recebimento; e</li>
                <li>As informações do pedido permitirem identificar a compra.</li>
              </ul>
              <p>Não exigimos justificativa detalhada, nem condicionamos o reembolso à revisão do conteúdo.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">4. Forma e prazo de devolução do valor</h4>
              <p>Após a confirmação da solicitação e validação da compra, o reembolso será processado conforme o meio de pagamento utilizado:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Cartão de crédito:</strong> O estorno pode aparecer em até 2 faturas, dependendo da operadora do cartão.</li>
                <li><strong>PIX:</strong> Devolução para a conta de origem em prazo geralmente mais rápido, conforme regras do provedor de pagamento.</li>
                <li><strong>Boleto/transferência:</strong> Poderá ser solicitada uma chave/conta para devolução.</li>
              </ul>
              <p className="text-xs italic text-muted-foreground mt-2">Observação: os prazos finais podem variar de acordo com o gateway/intermediador de pagamento.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">5. Reembolsos fora do prazo</h4>
              <p>Solicitações feitas após o prazo de 7 dias não são elegíveis para reembolso automático. Ainda assim, o cliente pode entrar em contato pelo suporte para avaliação de casos específicos, sem garantia de aprovação.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">6. Tentativas de fraude e má-fé</h4>
              <p>O Mapa da Alma se reserva o direito de recusar solicitações que apresentem indícios claros de fraude, uso indevido do meio de pagamento ou tentativa de chargeback indevida, sempre respeitando a legislação e oferecendo canal de diálogo.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">7. Contato</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Canal oficial:</strong> <a href="mailto:contato@omapadaalma.com" className="text-primary hover:underline">contato@omapadaalma.com</a></li>
                <li><strong>Local:</strong> Brasília/DF</li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground pt-4 border-t border-white/10">Última atualização: 29/01/2026</p>
          </div>
        );
      case "terms":
        return (
          <div className="space-y-6">
            <p className="font-bold text-foreground">O Mapa da Alma (RFJM LTDA)</p>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">1. Aceite dos Termos</h4>
              <p>Ao acessar este site e/ou adquirir o produto O Mapa da Alma, o cliente declara que leu, compreendeu e concorda com estes Termos de Uso. Caso não concorde, recomenda-se não utilizar o site nem realizar a compra.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">2. Quem somos</h4>
              <p>O Mapa da Alma é um produto oferecido pela RFJM LTDA, com sede em Brasília/DF.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">3. O que é o Mapa da Alma</h4>
              <p>O Mapa da Alma é um produto digital de leitura personalizada baseada em astrologia aplicada ao autoconhecimento, elaborada a partir dos dados informados pelo cliente. O material é entregue em formato digital e tem caráter reflexivo, educativo e orientativo, com foco em clareza, direcionamento e plano prático.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">4. O que o Mapa da Alma não é</h4>
              <p>O Mapa da Alma não é:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Adivinhação ou previsão determinística do futuro;</li>
                <li>Consulta médica, psicológica, terapêutica ou psiquiátrica;</li>
                <li>Diagnóstico de saúde ou recomendação de tratamento;</li>
                <li>Promessa de cura, resultado garantido ou solução imediata de problemas.</li>
              </ul>
              <p>O produto não substitui o acompanhamento de profissionais habilitados (médicos, psicólogos, terapeutas, advogados, contadores, consultores financeiros etc.) quando necessário.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">5. Responsabilidade do cliente e uso das informações</h4>
              <p>As interpretações apresentadas no Mapa da Alma devem ser utilizadas como ferramenta de autoconhecimento. O cliente é o único responsável pelas decisões, ações e resultados obtidos a partir do material. A RFJM LTDA/O Mapa da Alma não se responsabiliza por escolhas pessoais, profissionais, financeiras ou de saúde tomadas com base na leitura.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">6. Informações fornecidas pelo cliente</h4>
              <p>Para a entrega do produto, o cliente deve informar dados corretos, especialmente data, hora e cidade de nascimento. Dados incorretos podem alterar significativamente o resultado da leitura. Caso o cliente perceba erro nos dados enviados, deve comunicar o quanto antes para avaliação das possibilidades de correção.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">7. Prazo e forma de entrega</h4>
              <p>Após o envio dos dados necessários e a confirmação do pagamento, o Mapa da Alma será produzido e entregue em até 5 (cinco) dias úteis, salvo comunicação diferente no momento da compra.</p>
              <p>A entrega é realizada em formato digital (ex.: PDF ou link equivalente) para o e-mail informado pelo cliente e/ou canal indicado no momento da compra.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">8. Garantia e reembolso</h4>
              <p>O cliente possui 7 (sete) dias corridos, contados a partir do recebimento do Mapa da Alma, para solicitar reembolso integral, caso entenda que o material não faz sentido ou não atenda às expectativas.</p>
              <p>A solicitação deve ser feita pelo canal oficial de suporte: <a href="mailto:contato@omapadaalma.com" className="text-primary hover:underline">contato@omapadaalma.com</a>, informando nome completo e e-mail utilizado na compra. Reembolsos serão processados conforme as regras do meio de pagamento utilizado.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">9. Propriedade intelectual e restrições de uso</h4>
              <p>Todo o conteúdo do site e do Mapa da Alma (textos, estrutura, identidade visual, metodologia, marca, materiais e documentos) é protegido por direitos autorais e pertence ao O Mapa da Alma / RFJM LTDA e/ou seus responsáveis.</p>
              <p>É proibido:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Copiar, reproduzir, redistribuir, vender, disponibilizar publicamente ou utilizar comercialmente o conteúdo, total ou parcialmente, sem autorização formal;</li>
                <li>Remover marcas, assinaturas ou identificações do material;</li>
                <li>Compartilhar o arquivo/links em grupos, redes sociais ou plataformas de terceiros.</li>
              </ul>
              <p>A compra dá direito ao uso pessoal do material pelo cliente.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">10. Privacidade e proteção de dados</h4>
              <p>Ao utilizar este site e adquirir O Mapa da Alma, o cliente concorda com o tratamento dos dados necessários para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Processar o pagamento;</li>
                <li>Produzir e entregar o produto;</li>
                <li>Prestar suporte e cumprir obrigações legais.</li>
              </ul>
              <p>O Mapa da Alma se compromete a usar os dados apenas para finalidades legítimas relacionadas à prestação do serviço e atendimento ao cliente.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">11. Suporte e canais oficiais</h4>
              <p>O suporte ao cliente é prestado exclusivamente pelo canal oficial:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>E-mail: <a href="mailto:contato@omapadaalma.com" className="text-primary hover:underline">contato@omapadaalma.com</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">12. Alterações dos Termos</h4>
              <p>A RFJM LTDA/O Mapa da Alma pode atualizar estes Termos de Uso a qualquer momento para refletir melhorias, adequações legais ou mudanças operacionais. A versão vigente será sempre a publicada nesta página.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground">13. Legislação e foro</h4>
              <p>Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de Brasília/DF, com renúncia a qualquer outro, por mais privilegiado que seja, para dirimir eventuais controvérsias.</p>
            </div>
            
            <p className="text-xs text-muted-foreground pt-4 border-t border-white/10">Última atualização: 29/01/2026</p>
          </div>
        );
      default:
        return null;
    }
  };

  const getIcon = () => {
    if (type === "privacy") return <ShieldCheck className="w-5 h-5 text-primary" />;
    if (type === "refund") return <RefreshCcw className="w-5 h-5 text-primary" />;
    return <FileText className="w-5 h-5 text-primary" />;
  };

  return (
    <>
      {/* O Botão/Link que abre o modal */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm underline decoration-muted-foreground/30 hover:decoration-primary underline-offset-4"
      >
        {triggerText}
      </button>

      {/* O Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Fundo Escuro */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Caixa de Conteúdo */}
          <div className="relative bg-card border border-primary/20 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Cabeçalho */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  {getIcon()}
                </div>
                <h3 className="font-serif text-xl text-foreground">{title}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo com Scroll */}
            <div className="p-6 overflow-y-auto text-muted-foreground text-sm leading-relaxed space-y-4 custom-scrollbar">
              {getContent()}
            </div>

            {/* Rodapé do Modal */}
            <div className="p-4 border-t border-border bg-card/50 rounded-b-2xl flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LegalModal;