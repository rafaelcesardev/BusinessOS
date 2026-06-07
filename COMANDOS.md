# Comandos do BusinessOS

Guia completo dos 12 comandos. Todos são invocados pelo prefixo `/businessos`
(ou pelo atalho direto, se você criar — veja [Atalhos](#atalhos)).

Antes de tudo, rode `/businessos init` na pasta do seu negócio (ou do seu site)
pra criar o contexto. Sem isso, os comandos avisam que falta o `.businessos/`.

**Índice**
- Núcleo: [`init`](#init) · [`atualizar`](#atualizar) · [`mapear-rotinas`](#mapear-rotinas)
- Conteúdo: [`carrossel`](#carrossel) · [`publicar-tema`](#publicar-tema) · [`aprovar-post`](#aprovar-post) · [`seo`](#seo) · [`responder-avaliacoes`](#responder-avaliacoes) · [`email`](#email)
- Ads e dados: [`anuncio-google`](#anuncio-google) · [`relatorio-ads`](#relatorio-ads) · [`analisar-dados`](#analisar-dados)
- [Menu sem argumento](#menu) · [Atalhos](#atalhos) · [Onde tudo é salvo](#saidas) · [Chaves de API](#chaves)

---

## Núcleo

<a name="init"></a>
### `init` — configurar o negócio

**Pra que serve:** primeiro comando. Cria a pasta `.businessos/` na pasta atual
com a memória do negócio (quem é, como fala, foco) e a identidade visual.
Funciona em qualquer pasta — um site que já roda, uma pasta nova, tanto faz. Não
mexe nos seus arquivos nem no `CLAUDE.md` do projeto.

**Quando usar:** uma vez, ao começar a usar o BusinessOS num projeto.

**Como usar:**
```
/businessos init
```
Ele entrevista (perfil + 10 perguntas sobre negócio, voz, foco, identidade) e
preenche tudo. 5-7 minutos.

**Exemplo de conversa:**
> Você: `/businessos init`
> BusinessOS: "Qual perfil combina? 1) Solopreneur 2) Freelancer 3) Agência 4) Empresa"
> Você: "3, agência de marketing"
> BusinessOS: "Como você chama o que faz?" … (segue a entrevista)

**Resultado:** cria `.businessos/memoria/`, `.businessos/identidade/`,
`config.json` e `.env`.

---

<a name="atualizar"></a>
### `atualizar` — reconciliar a memória

**Pra que serve:** varre o projeto e compara com a memória. Acha o que ficou
desatualizado (cliente novo, foco que mudou, prazo vencido) e propõe correções.

**Quando usar:** de tempos em tempos, ou quando muita coisa mudou. No dia a dia o
sistema já aprende com suas correções sozinho — este comando é a varredura completa.

**Como usar:**
```
/businessos atualizar
```

**Exemplo:**
> BusinessOS: "Encontrei 2 coisas: 1) memoria/estrategia.md fala em 'fechar 1º
> cliente em fevereiro', já é abril. 2) Você gerou conteúdo pra 'Acme' mas ela não
> está em empresa.md. Aplico? (todas / algumas / nenhuma)"

**Resultado:** edita só as linhas relevantes da memória, mostrando o diff.

---

<a name="mapear-rotinas"></a>
### `mapear-rotinas` — criar automações

**Pra que serve:** descobre o que você repete toda semana e transforma em uma
skill personalizada própria (que vira um comando novo).

**Quando usar:** quando perceber que faz a mesma tarefa manual várias vezes.

**Como usar:**
```
/businessos mapear-rotinas
```

**Exemplo:**
> BusinessOS: "Quais 3 tarefas você repete toda semana?"
> Você: "Montar o briefing de cliente novo, sempre no mesmo formato"
> BusinessOS: propõe uma skill `/briefing` com input/output → você aprova → ela é
> criada em `.claude/skills/briefing/`.

**Resultado:** skills novas em `.claude/skills/<nome>/` (com scripts próprios
dentro da pasta, se precisarem). Use digitando `/<nome>`.

---

## Conteúdo

<a name="carrossel"></a>
### `carrossel` — carrossel e posts visuais

**Pra que serve:** cria carrossel ou post pro Instagram/TikTok/LinkedIn com a
identidade da marca. Gera o HTML estilizado, renderiza em PNG 1080×1350 e escreve
a legenda — tudo pronto pra postar.

**Quando usar:** post educativo, dica, lista, frase de impacto, conteúdo visual.

**Como usar:**
```
/businessos carrossel 5 dicas pra conservar pão artesanal
/businessos carrossel post único: "Pão de fermentação natural leva 24h"
```

**Tipos:** (1) texto puro, (2) com foto IA, (3) post único. Se não estiver claro,
ele pergunta.

**Fluxo:** escreve o texto → você aprova (checkpoint) → gera foto IA se pedido →
monta HTML → renderiza PNGs → gera legenda automática.

**Exemplo:**
> Você: `/businessos carrossel 5 erros ao guardar carne`
> BusinessOS: mostra os 5 slides em texto, oferece 3 títulos de capa → você
> aprova → gera os PNGs e a legenda.

**Resultado:** `.businessos/saidas/marketing/conteudo/<tema>-<data>/` com
`carrossel.html`, `instagram/slide-01.png…`, `legenda.md`.

**Precisa de:** Playwright (`bun add -d playwright && bunx playwright install chromium`, uma vez). Foto IA precisa de `OPENAI_API_KEY` ou `GEMINI_API_KEY` no `.env`.

---

<a name="publicar-tema"></a>
### `publicar-tema` — conteúdo completo de um tema

**Pra que serve:** de um tema, entrega o pacote completo: artigo de blog +
carrossel resumo + 3 legendas (Instagram, Facebook, LinkedIn), tudo amarrado. O
blog é a peça-mãe; o resto deriva dele.

**Quando usar:** quando quer trabalhar um tema pra SEO + redes de uma vez.

**Como usar:**
```
/businessos publicar-tema como escolher azeite extra virgem
/businessos publicar-tema          (sem tema → lista os temas da estratégia de SEO)
```

**Resultado:** artigo `draft: true` no blog do site + pasta de carrossel +
`legenda.md` e `legenda-linkedin.md`. **Não publica sozinho** — use `aprovar-post`.

**Precisa de:** site detectado em `config.json` (ele detecta/pergunta na 1ª vez).
Se rodou `seo` antes, usa a estratégia de conteúdo como fonte de temas.

---

<a name="aprovar-post"></a>
### `aprovar-post` — publicar de verdade

**Pra que serve:** pega um conteúdo pronto (do `publicar-tema`) e publica: tira o
blog do rascunho, copia as imagens pro site, faz commit/push (o site deploya),
espera ficar no ar, e posta o carrossel no Instagram + Facebook.

**Quando usar:** depois de revisar e aprovar o conteúdo. Só com sua confirmação.

**Como usar:**
```
/businessos aprovar-post como-escolher-azeite
/businessos aprovar-post            (sem slug → lista os rascunhos)
```

**Exemplo:**
> BusinessOS: mostra título, nº de slides, início da legenda, URL final →
> "Confirma publicação? (sim/não)" → você confirma → ele publica e devolve os links.

**Resultado:** post no ar no site + Instagram + Facebook. LinkedIn fica manual
(ele te entrega o texto pronto).

**Precisa de:** `.env` com `META_PAGE_ACCESS_TOKEN`, `META_PAGE_ID`,
`META_IG_USER_ID`, `SITE_URL`. Site com deploy automático a partir do `main`.

---

<a name="seo"></a>
### `seo` — SEO + GEO + Google Ads completo

**Pra que serve:** fluxo de 8 passos que monta a presença digital inteira:
1. Demanda (o que buscam) · 2. Concorrência · 3. Google Meu Negócio · 4. On-page ·
5. Estratégia de conteúdo · 6. Google Ads · 7. Monitoramento · 8. GEO (aparecer no
ChatGPT/Gemini/Perplexity). Pesquisa real na web, nunca inventa número.

**Quando usar:** pra estruturar SEO do zero, ou rodar um passo específico.

**Como usar:**
```
/businessos seo              (roda os 8 passos em sequência)
/businessos seo gmb          (só o Google Meu Negócio)
/businessos seo geo          (só o passo de aparecer em IAs)
```

**Resultado:** 8 arquivos numerados em `.businessos/saidas/marketing/seo/01…08.md`.
Alimenta `publicar-tema` (passo 5) e `anuncio-google` (passo 6).

---

<a name="responder-avaliacoes"></a>
### `responder-avaliacoes` — responder reviews do Google

**Pra que serve:** escreve respostas curtas, humanas e variadas pras avaliações do
Google Meu Negócio. Cita o nome, agradece sem soar robô, frase concreta.

**Quando usar:** ao receber avaliações novas.

**Como usar:** cole o texto ou print das reviews:
```
/businessos responder-avaliacoes
[cola: "João ⭐⭐⭐⭐⭐ Atendimento excelente, voltarei!"]
```

**Exemplo de saída:**
> **João** — 5★ — "Atendimento excelente"
> → "Que bom que gostou do atendimento, João! Caprichamos em cada detalhe. 😊"

**Importante:** reviews de 3★ ou menos → ele **para e alinha com você** antes de
responder (não responde no automático).

---

<a name="email"></a>
### `email` — rascunhar email profissional

**Pra que serve:** escreve um email calibrando o tom ao destinatário e ao objetivo,
na voz do seu negócio.

**Quando usar:** cobrar, propor, responder, agradecer, fazer follow-up.

**Como usar:**
```
/businessos email cobrar o cliente Acme da fatura de maio, com jeito
/businessos email responder esse cliente que reclamou do prazo [cola o email]
```

**Exemplo:** pra assuntos delicados (cobrança, recusa) ele oferece 2 versões —
uma mais direta, uma mais suave — e você escolhe.

**Resultado:** texto pronto pra copiar (sem salvar por padrão).

---

## Anúncios e dados

<a name="anuncio-google"></a>
### `anuncio-google` — campanha Google Ads em CSV

**Pra que serve:** monta a campanha inteira em arquivos CSV prontos pra importar no
Google Ads Editor: campanhas, grupos, palavras-chave, negativas, anúncios (RSAs),
extensões. Sai do briefing direto pro CSV.

**Quando usar:** pra criar campanha de Search sem montar grupo por grupo na mão.

**Como usar:**
```
/businessos anuncio-google
```
Ele pergunta o briefing (produto, público, região, orçamento, objetivo). Se você
rodou `seo` antes, usa o passo 6 como base.

**Resultado:** `.businessos/saidas/marketing/campanhas/google-ads-<data>/` com os
CSVs + `configuracoes.md` + `README.md` de como importar. **Tudo começa pausado.**

---

<a name="relatorio-ads"></a>
### `relatorio-ads` — relatório semanal de anúncios

**Pra que serve:** lê os exports do Google Ads e/ou Meta Ads e devolve um relatório
executivo: quanto gastou, quantas conversões, CPA, top/bottom campanhas, alertas
automáticos (queima de orçamento, CTR caindo) e 3-5 recomendações pra semana.

**Quando usar:** toda semana, pra entender a performance sem abrir as plataformas.

**Como usar:** aponte os arquivos exportados:
```
/businessos relatorio-ads dados/google-2026-05-12.csv dados/meta-2026-05-12.csv
/businessos relatorio-ads          (ele pergunta onde estão os exports)
```

**Resultado:** `.businessos/saidas/marketing/campanhas/relatorios/<data>-relatorio.md`.
Compara com a semana anterior automaticamente. Pode mandar por email (chama `email`).

---

<a name="analisar-dados"></a>
### `analisar-dados` — resumo executivo de um arquivo

**Pra que serve:** lê um arquivo (CSV, Excel, PDF, JSON) e devolve um resumo em
prosa: o que os dados mostram, o que funciona, o que preocupa, 3 recomendações e
uma tabela de números-chave. Você entende sem abrir o arquivo.

**Quando usar:** planilha de vendas, export de métricas, resultado de pesquisa.

**Como usar:**
```
/businessos analisar-dados dados/vendas-trimestre.xlsx
```

**Resultado:** `.businessos/saidas/analises/analise-<nome>-<data>.md`. Oferece
exportar em HTML pra apresentar.

---

<a name="menu"></a>
## Menu sem argumento

Não sabe o que fazer? Chame sem argumento:
```
/businessos
```
Ele lê o contexto e sugere os 2-3 comandos de maior valor pro seu momento, com a
lista completa por categoria. Nunca executa nada sozinho — é só sugestão.

---

<a name="atalhos"></a>
## Atalhos (`/comando` direto)

Cansou de digitar `/businessos`? Crie atalhos:
```
bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/pin.mjs" pin carrossel
bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/pin.mjs" pin seo
```
Agora `/carrossel` e `/seo` funcionam direto. Remover: troque `pin` por `unpin`.

---

<a name="saidas"></a>
## Onde tudo é salvo

Tudo dentro de `.businessos/` na pasta do seu projeto:
```
.businessos/
  memoria/         empresa.md · preferencias.md · estrategia.md
  identidade/      design-guide.md · logo.png
  config.json      caminhos do site, provider de imagem
  .env             chaves de API
  saidas/
    marketing/conteudo/    carrosséis e posts
    marketing/seo/         os 8 arquivos do SEO
    marketing/campanhas/   Google Ads + relatórios
    analises/              análises de dados
    emails/                emails salvos (se pedir)
```

---

<a name="chaves"></a>
## Chaves de API

Copie o modelo e preencha só o que for usar:
```bash
cp "${CLAUDE_PLUGIN_ROOT}/skills/businessos/assets/env.example" .businessos/.env
```

| Chave                                                       | Pra qual comando                |
| ----------------------------------------------------------- | ------------------------------- |
| `OPENAI_API_KEY` ou `GEMINI_API_KEY`                        | `carrossel` (foto IA)           |
| `META_PAGE_ACCESS_TOKEN`, `META_PAGE_ID`, `META_IG_USER_ID` | `aprovar-post`                  |
| `SITE_URL`                                                  | `aprovar-post`, `publicar-tema` |

O `.businessos/.env` nunca vai pro git (já está no `.gitignore`).
