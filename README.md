# O Mapa da Alma 🌌

> Landing Page de alta conversão para venda de mapas astrológicos personalizados e astrogenealogia.

![Project Status](https://img.shields.io/badge/status-active-success)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-Private-red)

## 📋 Sobre o Projeto

**O Mapa da Alma** é uma plataforma web desenvolvida para oferecer leituras astrológicas profundas e personalizadas. O projeto consiste em uma Landing Page moderna, responsiva e otimizada para conversão, oferecendo dois fluxos principais:
1.  **Venda do Produto Completo:** Um livro digital personalizado (+40 páginas) com plano de 90 dias.
2.  **Captura de Leads (Amostra Grátis):** Entrega de uma "Carta" inicial com a tríade astrológica (Sol, Lua, Ascendente).

O design foca em uma estética mística e elegante (Dark Mode com detalhes em Dourado), utilizando animações sutis e uma UX fluida.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído com uma stack moderna focada em performance e manutenibilidade:

* **[React](https://reactjs.org/):** Biblioteca principal para construção da interface.
* **[TypeScript](https://www.typescriptlang.org/):** Superset JavaScript para tipagem estática e segurança no código.
* **[Vite](https://vitejs.dev/):** Build tool de próxima geração (rápido e leve).
* **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilitários para estilização rápida e responsiva.
* **[Lucide React](https://lucide.dev/):** Biblioteca de ícones leve e consistente.
* **[Framer Motion](https://www.framer.com/motion/):** (Opcional/Se utilizado) Para animações complexas de entrada.
* **[Radix UI / Shadcn UI](https://ui.shadcn.com/):** Componentes base acessíveis (Modais, Botões, etc.).

---

## ✨ Funcionalidades Principais

* **🎨 Design Responsivo & Temático:** Layout adaptável (Mobile/Desktop) com tema escuro e acentos dourados (`text-gradient-gold`).
* **🔄 Modos de Visualização:** Lógica interna para alternar entre "Página de Vendas" e "Página de Captura" (Amostra).
* **📝 Formulário de Nascimento:** Coleta precisa de dados (Data, Hora, Cidade) para geração do mapa.
* **⚖️ Conformidade Legal (LGPD):** Modais integrados e acessíveis para:
    * Termos de Uso.
    * Política de Privacidade (com detalhes sobre Meta Pixel/Google Analytics).
    * Política de Reembolso/Trocas.
* **💳 Integração de Checkout:** Redirecionamento seguro para gateway de pagamento (Asaas).
* **📱 Seções Otimizadas:**
    * **Hero:** Promessa forte e CTA claro.
    * **Dores (Shadows):** Conexão emocional com o usuário.
    * **Solução (Mandala):** Explicação visual do produto.
    * **Entregáveis:** Cards detalhados com o que o cliente recebe.
    * **Prova Social:** Depoimentos e garantia.

---

## 📂 Estrutura do Projeto

```bash
src/
├── assets/             # Imagens, logos e recursos estáticos
├── components/
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   ├── mapa-da-alma/   # Componentes específicos da Landing Page
│   │   ├── HeroSection.tsx
│   │   ├── DeliverablesSection.tsx
│   │   ├── LegalModal.tsx  <-- Modais de Termos/Privacidade
│   │   ├── Footer.tsx
│   │   └── ...
├── lib/
│   ├── utils.ts        # Funções utilitárias (cn, formatação)
│   └── i18n.ts         # Arquivo de traduções/textos centralizados
├── App.tsx             # Componente raiz e roteamento
└── main.tsx            # Ponto de entrada

🔧 Como Rodar Localmente
Pré-requisitos: Você precisa ter o Node.js instalado.

1. Clone o repositório:
#Bash
git clone [https://github.com/15JohnnY16/soul-map-alchemy-06.git](https://github.com/15JohnnY16/soul-map-alchemy-06.git)
cd soul-map-alchemy-06

2. Instale as dependências:
#Bash
npm install
# ou
yarn install

3. Rode o servidor de desenvolvimento:
#Bash
npm run dev

4. Acesse no navegador: O projeto estará rodando em http://localhost:xxxx (xxxx é a porta indicada no terminal).

📦 Build e Deploy

Para gerar a versão otimizada para produção:
#Bash
npm run build

Os arquivos estáticos serão gerados na pasta dist/. Esses arquivos podem ser hospedados em qualquer serviço de hospedagem estática como Vercel, Netlify, ou em um servidor VPS/Hostgator (via Nginx/Apache).

🛡️ Direitos e Licença

Este projeto é propriedade intelectual da RFJM LTDA. Todo o conteúdo, design e metodologia "O Mapa da Alma" são protegidos.

Desenvolvimento: Equipe Tech O Mapa da Alma.

Contato: contato@omapadaalma.com

<p align="center"> Feito com 💜 e ✨ </p>