# Product

## Register

brand

## Users

Donos de pequenas e médias empresas — founders que tocam o próprio marketing,
SEO, anúncios e operação. Em geral **não são técnicos**: chegam na página pelo
GitHub ou por indicação, querem entender em segundos o que o BusinessOS faz por
eles e se vale instalar. Contexto de leitura: avaliando, cético, com pouco tempo,
medindo se "isso é pra mim ou é mais uma ferramenta de dev".

## Product Purpose

BusinessOS é um **plugin do Claude Code** que roda por cima de qualquer projeto e
dá ao negócio três coisas: memória própria (cérebro isolado em `.businessos/`),
identidade visual aplicada em tudo que gera, e 12 comandos prontos de marketing,
SEO, ads e operação. A tese central: IA não é ferramenta que a empresa usa — é o
**sistema operacional** em que ela roda, transformando processos de _open loop_
(executa cego) em _closed loop_ (captura → realimenta → aprende com cada correção).

A landing/documentação (`index.html`) é a vitrine: precisa, ao mesmo tempo,
**converter** (instalar o plugin), **convencer** (comprar a tese open→closed loop)
e **provar autoridade** (o craft da própria página é evidência de que o sistema
gera coisa boa). Sucesso = founder entende a tese, confia, e instala.

## Brand Personality

Voz **próxima, pragmática e didática**: fala com o dono de PME no nível dele, sem
jargão de dev, sem hype de guru. Explica conceito técnico (loop, overlay, memória)
em linguagem de negócio. Mão na massa, direta, acolhedora — "isso resolve o seu
problema" em vez de "veja nossas features".

Importante: a **voz** é próxima/didática, mas o **acabamento visual** carrega
autoridade silenciosa (editorial dark, serif Fraunces, terracota). A página
parece cara e bem-feita justamente para provar competência — a proximidade vem do
texto, não de baixar o nível do design. Emoção alvo: confiança + alívio ("alguém
finalmente fez isso simples pra mim").

## Anti-references

Quatro coisas que esta página **não pode** parecer:

- **SaaS genérico / "cream"**: fundo creme near-white, eyebrow tracked em maiúsculas
  acima de toda seção, grids de cards idênticos, hero-metric template. O cheiro de
  IA padrão de 2026.
- **Infoproduto / hype de guru**: setas apontando, countdown, promessa exagerada,
  excesso de emoji, "transforme seu negócio em 7 dias".
- **Docs cru sem alma**: página de documentação técnica seca, tudo monoespaçado,
  zero identidade, parágrafo cinza em branco.
- **Corporativo frio**: azul-marinho enterprise, stock photos, linguagem de TI
  corporativa, "soluções de transformação digital".

## Design Principles

- **O craft é a prova.** A página tem que ser tão bem-feita que dispense o discurso
  de "geramos conteúdo de qualidade" — o próprio acabamento é o argumento.
- **Traduzir, não simplificar.** Conceito técnico (overlay, closed loop, memória)
  vira linguagem de negócio sem perder a precisão. Didático ≠ raso.
- **Negócio antes de feature.** Falar do problema do founder e do ganho, não da
  lista de comandos. Os 12 comandos são consequência, não a manchete.
- **Autoridade silenciosa.** Confiança vem da composição, do ritmo e da tipografia
  — nunca de superlativos, selos ou pressão de venda.
- **Uma cor que importa.** Terracota é o único destaque; usar com intenção, não
  espalhar. Restrição é sinal de controle.

## Accessibility & Inclusion

WCAG **AA** como piso: corpo de texto ≥ 4.5:1, texto grande ≥ 3:1 (atenção ao
texto `--muted` sobre superfícies escuras e ao corpo `--cream-body` sobre `--cream`).
Suporte completo a `prefers-reduced-motion` (alternativa de crossfade/instantâneo
para toda animação). Navegação por teclado com foco visível. Conteúdo legível e
funcional mesmo sem JS (a classe `.js` é progressive enhancement, não requisito).
