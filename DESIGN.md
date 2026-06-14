---
name: BusinessOS
description: O sistema operacional do seu negócio dentro do Claude Code — landing/documentação editorial dark.
colors:
  bg: "#0E1116"
  bg-2: "#12161D"
  surface: "#171C24"
  surface-2: "#1D232C"
  ink: "#FAFAF7"
  ink-soft: "#D7D8D2"
  muted: "#9CA3AE"
  muted-2: "#6E7681"
  cream: "#F5ECD7"
  cream-ink: "#1A1A1A"
  cream-body: "#4A463C"
  accent: "#D2683F"
  accent-hi: "#E8825B"
  accent-deep: "#B14E2A"
typography:
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.7rem, 1.6rem + 5.6vw, 5.4rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.2rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.26em"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 4.5rem)"
  section: "clamp(4.5rem, 9vw, 8rem)"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-hi}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
  nav-cta:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1.05rem"
  nav-cta-hover:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.lg}"
    padding: "1.6rem"
---

# Design System: BusinessOS

## 1. Overview

**Creative North Star: "The Warm Machine"**

BusinessOS parece uma máquina de precisão com sangue quente. A base é um dark
técnico e controlado (`#0E1116`), camada sobre camada de superfícies que sobem em
tom (`bg → bg-2 → surface → surface-2`), com uma única cor viva — a terracota
`#D2683F` — funcionando como luz de status: rara, intencional, sempre indicando
"aqui há vida/ação". O creme `#F5ECD7` e a serifada Fraunces trazem o calor humano
que impede a página de virar mais um painel frio de ferramenta. A voz do produto é
próxima e didática; o acabamento é editorial e caro. Essa tensão é o ponto: a
máquina é séria, mas fala com você no seu nível.

O sistema rejeita explicitamente quatro coisas. Não é **SaaS genérico/creme** — o
fundo é dark saturado, não near-white com eyebrow cinza em toda seção. Não é
**infoproduto/hype** — zero setas, countdown ou promessa exagerada. Não é **docs
cru sem alma** — tem tipografia, ritmo e atmosfera (grain overlay, glow radial
único). Não é **corporativo frio** — nada de azul-marinho enterprise nem stock
photo. O craft da página É o argumento de venda: bem-feito o suficiente para
dispensar o discurso de "geramos conteúdo de qualidade".

Densidade média-alta com respiro generoso entre seções (`clamp(4.5rem, 9vw, 8rem)`).
Composição assimétrica (grids `0.85fr 1.15fr`), nunca o grid de cards idênticos.

**Key Characteristics:**
- Dark editorial em camadas tonais, não em sombras pesadas.
- Terracota como única voz de cor — luz de status, ≤10% de qualquer tela.
- Trio Fraunces (serif) + Inter (sans) + JetBrains Mono (voz da máquina).
- Atmosfera por grain + glow radial único, nunca glassmorphism decorativo.
- Motion ease-out-expo, contido, sempre com alternativa de reduced-motion.

## 2. Colors

Paleta dark de quatro camadas tonais ancorada numa única terracota quente, com um creme editorial como contraponto humano.

### Primary
- **Terracota** (`#D2683F`): a única cor de destaque. Luz de status do sistema — CTAs primários, marcadores de loop fechado, o slash do logo, o `::before` do eyebrow, cursor do terminal, `::selection`. Sua raridade é o ponto.
- **Terracota Clara / Ember** (`#E8825B`): variante de hover e de ênfase em texto (`em` no hero, links de footer no hover, labels mono de seção). O "brilho" da brasa.
- **Terracota Profunda** (`#B14E2A`): bordas e contornos de elementos accent (anel do número de step, borda do loop fechado). Nunca como preenchimento de área grande.

### Neutral
- **Carbono / bg** (`#0E1116`): fundo base de toda a página. O escuro de sala de comando.
- **Carbono Elevado** (`#12161D`) e **Superfícies** (`#171C24`, `#1D232C`): camadas tonais que sobem para criar profundidade sem sombra — cards, terminal, pipes, linhas de loop.
- **Marfim / ink** (`#FAFAF7`): texto principal e títulos. Off-white quente, nunca branco puro.
- **Ink Soft** (`#D7D8D2`): texto de leitura secundário (lead, blockquote, valores).
- **Cinza Médio / muted** (`#9CA3AE`) e **Cinza Profundo** (`#6E7681`): texto de apoio, legendas, metadados mono. Atenção a contraste (ver Do's & Don'ts).
- **Creme Editorial** (`#F5ECD7`) com tinta `#1A1A1A` / corpo `#4A463C`: o calor humano. Reservado para blocos invertidos/destaque sobre claro; carrega a "máquina quente".

### Named Rules
**The Status-Light Rule.** A terracota é luz de status, não tinta de parede. Aparece em ≤10% de qualquer tela e sempre sinaliza ação, vida ou estado positivo (loop fechado). Espalhá-la em áreas grandes mata o sinal — restrição é o que dá força.

**The Tonal-Depth Rule.** Profundidade vem de empilhar tons (`bg → surface-2`), não de sombras escuras. Sombra só para painéis que genuinamente flutuam (ver Elevation).

## 3. Typography

**Display Font:** Fraunces (com Georgia, serif)
**Body Font:** Inter (com system-ui)
**Label/Mono Font:** JetBrains Mono (com ui-monospace)

**Character:** Serif de alto contraste e personalidade (Fraunces, com itálico expressivo para ênfase) contra uma sans neutra e legível (Inter), com mono técnica (JetBrains) como a "voz da máquina" — comandos, labels, metadados. O par é de eixo de contraste (serif + sans + mono), nunca dois sans parecidos.

### Hierarchy
- **Display** (Fraunces 600, `clamp(2.7rem, …, 5.4rem)`, lh 0.98, ls -0.04em): só o H1 do hero. Itálico terracota-clara em palavras-chave (`em`).
- **Headline** (Fraunces 500, `clamp(2rem, …, 3.2rem)`, lh 1.02, ls -0.03em): títulos de seção (H2).
- **Title** (Fraunces 600, ~1.3rem, lh 1.2, ls -0.02em): nomes de princípio, cards, steps (H3/H4).
- **Body** (Inter 400, `clamp(1rem, …, 1.0625rem)`, lh 1.6): corpo de leitura. `text-wrap: pretty`; lead limitado a 60ch.
- **Label** (JetBrains Mono 500, 0.78rem, ls 0.26em, uppercase): eyebrows de seção, labels de categoria, metadados. Sempre em terracota-clara.

### Named Rules
**The Three-Voice Rule.** Três famílias, três papéis fixos: Fraunces fala identidade (títulos, ênfase), Inter fala leitura (corpo), JetBrains fala máquina (comandos, labels, números). Nunca trocar os papéis — corpo nunca em serif, título nunca em mono.

**The Balanced-Headline Rule.** Títulos (h1–h4) usam `text-wrap: balance` e `letter-spacing` apertado (floor -0.04em no display). Prosa longa usa `text-wrap: pretty`. Teto do display ≤ 5.4rem — a página compõe, não grita.

## 4. Elevation

Sistema **quase flat por padrão**: a profundidade é construída por camadas tonais e bordas de 1px (`rgba(250,250,247,0.11)`), não por sombras. Sombra é exceção reservada a painéis que genuinamente flutuam sobre o conteúdo — o terminal e a árvore de arquivos — onde uma sombra ambiente profunda e difusa os descola do fundo. Atmosfera (não elevação) vem de um grain overlay sutil (opacity .035, mix-blend overlay) e de um único glow radial terracota no hero.

### Shadow Vocabulary
- **Painel flutuante** (`box-shadow: 0 30px 70px -40px rgba(0,0,0,.8)`): terminal, tree. Difusa, deslocada para baixo, quase preta. Sensação de objeto pousado sobre a página.
- **Nav scrolled** (`backdrop-filter: blur(14px)` + borda inferior `--line`): a nav ganha vidro fosco e linha só após o scroll — não é sombra, é separação por blur + contraste.

### Named Rules
**The Flat-By-Default Rule.** Superfícies são planas em repouso. Profundidade = tom + borda de 1px. Sombra aparece só em elementos que flutuam de verdade (terminal, tree) ou como resposta de estado. Se parecer um app de 2014, a sombra está escura/pequena demais — aqui ela é enorme, suave e quase invisível na borda.

## 5. Components

### Buttons
- **Shape:** pílula total (`border-radius: 999px`). Padding `0.85rem 1.5rem`. Fonte mono 0.92rem.
- **Primary:** preenchimento terracota (`--accent`), texto branco, borda da mesma cor. Hover → terracota-clara (`--accent-hi`) + `translateY(-2px)`; seta interna desliza 3px.
- **Ghost:** transparente, borda `--line`, texto `--ink`. Hover → borda `--ink-soft` + lift -2px.
- **Active:** `translateY(0) scale(.975)` em ambos — feedback tátil mínimo e contido.
- **Nav CTA:** pílula mono menor, borda `--line`; hover inverte para fundo terracota + texto branco.

### Cards / Containers
- **Corner Style:** `14px` (lg) para painéis principais (terminal, tree, pipe), `12px` (md) para o bloco de loop.
- **Background:** `--surface`, ou gradiente sutil `surface → bg-2` em painéis flutuantes.
- **Shadow Strategy:** flat por padrão; só terminal/tree recebem a sombra de painel flutuante (ver Elevation).
- **Border:** sempre 1px `--line`. A borda é o que define o card, não a sombra.
- **Internal Padding:** `1.6rem` típico.

### Inputs / Fields
Não há campos de formulário na landing atual. Quando existirem, seguir o sistema: fundo `--surface`, borda 1px `--line`, raio `8px` (sm), foco com `outline: 2px solid var(--accent-hi); outline-offset: 3px` (o anel de foco global já definido). Nunca glow difuso decorativo.

### Navigation
- Fixa no topo, fundo translúcido (`color-mix bg 72%`); ao rolar ganha `blur(14px)`, fundo 90% e borda inferior.
- Links em mono 0.92rem `--muted`; hover → `--ink`; ativo → `--ink` com sublinhado terracota de 2px.
- Mobile (≤760px): links secundários (`.hide-sm`) somem, restam marca + CTA + GitHub.

### Signature: Terminal Motif
Painel mono que encena o produto em uso — barra com dots (primeiro dot terracota), corpo com `prompt` terracota-clara, `cmd` ink, `out` muted, e cursor terracota piscando (`blink`, com `prefers-reduced-motion` desligando). É a prova visual da tese. Acompanha a **árvore de arquivos** mono (`.tree`) que mostra o overlay `.businessos/`.

### Eyebrow (kicker controlado)
Label mono uppercase com tracking `.26em`, terracota-clara, precedido de um traço terracota de 26px (`::before`). É um sistema de marca deliberado — mono + traço + terracota — não o eyebrow cinza genérico de SaaS. Usar com parcimônia, não como reflexo em toda seção.

## 6. Do's and Don'ts

### Do:
- **Do** usar a terracota como luz de status: ≤10% da tela, sempre sinalizando ação/vida/loop fechado (The Status-Light Rule).
- **Do** construir profundidade por camadas tonais (`bg → surface-2`) + bordas de 1px; sombra só em painéis que flutuam de verdade.
- **Do** manter os três papéis tipográficos fixos: Fraunces=identidade, Inter=leitura, JetBrains=máquina.
- **Do** dar ênfase com o itálico terracota-clara da Fraunces (`em`), não com negrito gritado nem caixa-alta.
- **Do** fornecer alternativa `@media (prefers-reduced-motion: reduce)` para toda animação (cursor, ticker, reveal, scroll) — já é padrão do projeto.
- **Do** preferir composição assimétrica (`0.85fr 1.15fr`) ao grid de cards idênticos.

### Don't:
- **Don't** parecer **SaaS genérico/creme**: nada de fundo near-white, eyebrow cinza em toda seção, hero-metric template ou grids de cards idênticos.
- **Don't** parecer **infoproduto/hype**: sem setas, countdown, emoji em excesso ou promessa exagerada.
- **Don't** parecer **docs cru sem alma**: nunca tudo mono/cinza sem identidade — manter Fraunces, ritmo e atmosfera.
- **Don't** parecer **corporativo frio**: proibido azul-marinho enterprise, stock photo, jargão de TI corporativa.
- **Don't** espalhar terracota em áreas grandes de preenchimento — mata o sinal de status.
- **Don't** usar `border-left`/`border-right` colorida > 1px como faixa de destaque, gradient-text (`background-clip: text`) ou glassmorphism decorativo. O único blur permitido é o da nav ao rolar.
- **Don't** deixar texto `--muted` (#9CA3AE) ou `--muted-2` em corpo de leitura longo sobre superfície escura sem checar 4.5:1 — subir para `--ink-soft` quando for leitura, não metadado.
