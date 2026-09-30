# Convite de Formatura · Lara Sofia

Abra `index.html` no navegador (já vem compilado em `dist/`). Para personalizar por convidado: `index.html?convidado=Maria`.

## Fluxo
1. **Carta fechada**: fundo Molten Metal, carta grande balançando, selo de cera vermelho colado.
2. **Toque**: o selo quebra, a aba abre, a carta sobe e o papel cresce até virar a página.
3. **Convite**: fundo Ferrofluid, dados do evento, contagem regressiva, ações e coisas essenciais.

## Onde cada prompt é usado
| Componente | Onde | Props principais |
|---|---|---|
| MoltenMetal | Fundo da carta fechada | azul `#2739ff`/`#0817ea` + dourado `#EAB308`, `colorMode="molten"` |
| Ferrofluid | Fundo do convite | cores `#EAB308`/`#1605ec`, `flowDirection="down"` |
| ParticleText | Títulos grandes: "CONVITE", "LARA SOFIA" e o número da contagem | `trigger="click"`, destaque dourado |
| FoldText | Todos os textos pequenos | `splitBy` char/word, `hinge="top"` |
| SpecularButton | Botões circulares: confirmar presença, localização, dress code | `radius=999`, brilho dourado (`autoAnimate` em telas de toque) |
| RubberSegment | Meses, Semanas, Dias, Horas | troca a unidade do número acima |

## Editar
Tudo em `src/App.jsx` (topo): data (`EVENT`), WhatsApp (`WA`, 82 99142-3318), mapa (`MAPS`), textos de "Coisas essenciais".
Cores e fontes: `src/styles.css` (`:root`). Fontes (Cinzel e Montserrat) já estão em `src/fonts`.

## Recompilar
`npm install` e depois `npm run build` (gera `dist/app.js` e `dist/app.css`).
