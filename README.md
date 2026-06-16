# BusinessOS

> O sistema operacional do seu negócio dentro do Claude Code.

BusinessOS é um **plugin do Claude Code**. Você instala uma vez e ele passa a
funcionar **por cima de qualquer projeto** — seu site, seu app, uma pasta vazia,
tanto faz. Não vira a raiz do projeto, não sequestra nada: o "cérebro" do negócio
vive isolado numa pasta `.businessos/` dentro da pasta onde você está trabalhando.

Em alguns minutos sua empresa ganha memória própria, identidade visual aplicada
em tudo que o sistema gera, e 12 comandos prontos pra marketing, SEO, ads e
operação — com você dirigindo.

🔗 **Repositório:** [github.com/rafaelcesardev/BusinessOS](https://github.com/rafaelcesardev/BusinessOS)
· 📖 **Referência completa de cada comando:** [COMANDOS.md](COMANDOS.md)

---

## A tese

IA não é uma ferramenta que sua empresa usa. É o **sistema operacional** em que
ela roda.

Cada processo crítico que hoje roda em **open loop** vira **closed loop** dentro
do BusinessOS:

| Loop | Ciclo | O problema / o ganho |
| ---------- | ----------------------------------------------- | ------------------------------------------ |
| **open**   | decide → executa → repete cego                  | sem captura, sem medição, sem aprendizado  |
| **closed** | decide → executa → captura → realimenta → ajusta | o sistema aprende com cada correção sua    |

O sistema não substitui você. Vira parte da sua empresa.

---

## Instalar

Distribuído como plugin via marketplace. Instala uma vez, fica disponível em
**qualquer projeto** — não precisa copiar nada pra cada repositório.

**1. Adicione o marketplace e instale o plugin.**

```
/plugin marketplace add rafaelcesardev/BusinessOS
/plugin install businessos@businessos-marketplace
```

**2. Entre na pasta do seu negócio (ou do seu site) e configure o contexto.**
Funciona na pasta atual, sempre — não mexe no seu projeto.

```
/businessos init
```

Ele entrevista você sobre a empresa, tom de voz, foco e identidade, e cria a pasta
`.businessos/` ali mesmo. **Funciona em qualquer pasta** — seja a raiz de um site
Astro que já roda, seja uma pasta nova. 5-7 minutos.

**3. Chame os comandos.** Sem argumento, ele sugere os de maior valor pro seu momento.

```
/businessos                 → menu do que dá pra fazer agora
/businessos carrossel       → carrossel 1080×1350 com a identidade da marca
/businessos seo             → fluxo SEO/GEO/Ads em 8 passos
/businessos publicar-tema   → artigo de blog + carrossel + 3 legendas
/businessos relatorio-ads   → relatório semanal de Google + Meta Ads
```

**4. Opcional:** crie atalhos diretos (sem o prefixo `/businessos`).

```bash
bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/pin.mjs" pin carrossel
```

Agora `/carrossel` funciona direto. Remover: troque `pin` por `unpin`.

### Instalar por projeto (em vez de global)

Os passos acima instalam o BusinessOS no **seu usuário** — fica disponível em
qualquer pasta da sua máquina. Se você prefere prender o plugin a **um projeto
específico** (e fazer ele viajar com o repositório, pro time inteiro herdar ao
clonar), commite um `.claude/settings.json` na raiz do projeto host:

```json
{
  "extraKnownMarketplaces": {
    "businessos-marketplace": {
      "source": {
        "source": "github",
        "repo": "rafaelcesardev/BusinessOS"
      }
    }
  },
  "enabledPlugins": {
    "businessos@businessos-marketplace": true
  }
}
```

Quem abrir o projeto recebe um pedido pra confiar no repositório; ao confiar, o
marketplace é registrado e o plugin é habilitado **automaticamente** — sem rodar
`/plugin` à mão. O motor continua se atualizando sozinho e o `init` funciona
igual. A diferença é só o escopo: vale **naquele projeto**, não no usuário inteiro.

> **Global ou por projeto?** Global é melhor pra quem usa o BusinessOS em vários
> negócios na mesma máquina. Por projeto é melhor quando o plugin é parte da
> configuração de um repositório só e você quer que o time todo o tenha ativo ao
> clonar — como um `.gitignore`. Os dois modos usam o mesmo motor; dá pra trocar
> a qualquer momento.

---

## Como o BusinessOS pensa

O cérebro do negócio vive **ao lado do seu projeto — nunca por cima dele**. O
Claude lê o cérebro a cada comando. Quanto melhor a memória, melhor o sistema.
Toda peça visual respeita a identidade. O resultado fica versionado com o seu
projeto, é seu.

```
.businessos/              ← o cérebro, na pasta do seu projeto
├── memoria/              empresa · preferências · estratégia
├── identidade/           cores · fontes · logo
├── config.json           caminhos do site, provider de imagem
├── .env                  chaves de API (nunca vai pro git)
└── saidas/               tudo que o sistema produz
    ├── marketing/conteudo/    carrosséis e posts
    ├── marketing/seo/         os 8 arquivos do SEO
    ├── marketing/campanhas/   Google Ads + relatórios
    └── analises/              análises de dados
```

**Três princípios que não se violam:**

- **Overlay, nunca raiz.** O cérebro fica em `.businessos/` na pasta onde você
  trabalha. Não mexe nos seus arquivos nem no seu `CLAUDE.md`.
- **Aprende com correções.** Corrigiu algo ou deu uma instrução permanente? O
  sistema pergunta se quer salvar e roteia pra memória, preferências, estratégia
  ou identidade. Não repete o erro.
- **O motor atualiza sozinho.** Skills, scripts e referências vivem no plugin e
  atualizam com `/plugin`. Você recebe melhorias sem refazer nada — o seu cérebro
  de negócio fica intacto.

---

## Os 12 comandos

Todos invocados pelo prefixo `/businessos` (ou pelo atalho direto, se você criar).
Os exemplos completos e conversas de cada um estão em [COMANDOS.md](COMANDOS.md).

### Núcleo — configurar & manter

#### `init`
- **O que faz:** primeiro comando. Cria o `.businessos/` na pasta atual com a
  memória do negócio (quem é, como fala, foco) e a identidade visual.
- **Como usar:** `/businessos init`
- **Resultado:** cria `memoria/`, `identidade/`, `config.json` e `.env`. 5-7 min.

#### `atualizar`
- **O que faz:** varre o projeto e compara com a memória. Acha o que ficou
  desatualizado (cliente novo, foco que mudou, prazo vencido) e propõe correções.
- **Como usar:** `/businessos atualizar`
- **Resultado:** edita só as linhas relevantes da memória, mostrando o diff.

#### `mapear-rotinas`
- **O que faz:** descobre o que você repete toda semana e transforma em uma skill
  personalizada própria (que vira um comando novo).
- **Como usar:** `/businessos mapear-rotinas`
- **Resultado:** skills novas em `.claude/skills/<nome>/`, chamáveis por `/<nome>`.

### Conteúdo — criar & publicar

#### `carrossel`
- **O que faz:** carrossel ou post visual com a identidade da marca → gera o HTML
  estilizado, renderiza em PNG 1080×1350 e escreve a legenda. Três tipos: texto
  puro, com foto IA, ou post único.
- **Como usar:** `/businessos carrossel 5 dicas pra conservar pão artesanal`
- **Fluxo:** texto → você aprova → foto IA (se pedido) → HTML → PNGs → legenda.
- **Resultado:** `saidas/marketing/conteudo/<tema>/` com `carrossel.html`, os PNGs
  e `legenda.md`.
- **Precisa de:** Playwright. Foto IA precisa de `OPENAI_API_KEY` ou `GEMINI_API_KEY`.

#### `publicar-tema`
- **O que faz:** de um tema, entrega o pacote completo — artigo de blog (a
  peça-mãe) + carrossel resumo + 3 legendas (Instagram, Facebook, LinkedIn).
- **Como usar:** `/businessos publicar-tema como escolher azeite extra virgem`
- **Resultado:** artigo `draft: true` no blog + pasta de carrossel + legendas.
  **Não publica sozinho** — use `aprovar-post`.
- **Precisa de:** site detectado em `config.json`. Usa a estratégia de `seo` como
  fonte de temas, se você rodou antes.

#### `aprovar-post`
- **O que faz:** pega um conteúdo pronto e publica — tira o blog do rascunho,
  copia as imagens, faz commit/push (o site deploya), espera ficar no ar e posta o
  carrossel no Instagram + Facebook. LinkedIn fica manual (entrega o texto pronto).
- **Como usar:** `/businessos aprovar-post como-escolher-azeite`
- **Resultado:** post no ar no site + Instagram + Facebook, **só com sua confirmação**.
- **Precisa de:** `.env` com tokens da Meta + `SITE_URL`, e site com deploy
  automático a partir do `main`.

#### `seo`
- **O que faz:** fluxo de 8 passos que monta a presença digital inteira — demanda
  → concorrência → Google Meu Negócio → on-page → estratégia de conteúdo → Google
  Ads → monitoramento → GEO (aparecer em ChatGPT/Gemini/Perplexity). Pesquisa real
  na web, nunca inventa número.
- **Como usar:** `/businessos seo` (8 passos) · `/businessos seo gmb` · `/businessos seo geo`
- **Resultado:** 8 arquivos numerados em `saidas/marketing/seo/`. Alimenta
  `publicar-tema` e `anuncio-google`.

#### `responder-avaliacoes`
- **O que faz:** escreve respostas curtas, humanas e variadas pras avaliações do
  Google Meu Negócio. Cita o nome, agradece sem soar robô, frase concreta.
- **Como usar:** `/businessos responder-avaliacoes` (cole o texto ou print das reviews)
- **Importante:** reviews de 3★ ou menos → ele **para e alinha com você** antes de
  responder. Nunca no automático.

#### `email`
- **O que faz:** rascunha um email na voz do seu negócio, calibrando o tom ao
  destinatário e ao objetivo. Em assuntos delicados oferece 2 versões (uma mais
  direta, uma mais suave).
- **Como usar:** `/businessos email cobrar o cliente Acme da fatura de maio, com jeito`
- **Resultado:** texto pronto pra copiar (sem salvar por padrão).

### Ads e dados — investir & medir

#### `anuncio-google`
- **O que faz:** monta a campanha inteira em CSVs prontos pra importar no Google
  Ads Editor — campanhas, grupos, palavras-chave, negativas, anúncios (RSAs) e
  extensões.
- **Como usar:** `/businessos anuncio-google`
- **Resultado:** `saidas/marketing/campanhas/google-ads-<data>/` com os CSVs +
  `configuracoes.md` + README de importação. **Tudo começa pausado.**

#### `relatorio-ads`
- **O que faz:** lê os exports do Google Ads e/ou Meta Ads e devolve um relatório
  executivo — gasto, conversões, CPA, top/bottom campanhas, alertas automáticos
  (queima de orçamento, CTR caindo) e 3-5 recomendações. Compara com a semana
  anterior.
- **Como usar:** `/businessos relatorio-ads dados/google.csv dados/meta.csv`
- **Resultado:** relatório em `saidas/marketing/campanhas/relatorios/`. Pode mandar
  por email.

#### `analisar-dados`
- **O que faz:** lê um arquivo (CSV, Excel, PDF, JSON) e devolve um resumo em
  prosa — o que os dados mostram, o que funciona, o que preocupa, 3 recomendações
  e uma tabela de números-chave.
- **Como usar:** `/businessos analisar-dados dados/vendas-trimestre.xlsx`
- **Resultado:** análise em `saidas/analises/`. Oferece exportar em HTML pra apresentar.

---

## Fluxos em destaque

Alguns comandos são sequências reais. O `seo` estrutura a base; o conteúdo deriva
dela; a publicação fecha o loop.

**`seo` — 8 passos:**

```
1. Demanda        →  o que o público realmente busca
2. Concorrência   →  quem já aparece e como
3. Google Meu Negócio  →  a ficha local, otimizada
4. On-page        →  o site falando a língua da busca
5. Conteúdo       →  a estratégia que vira temas
6. Google Ads     →  mídia paga estruturada
7. Monitoramento  →  o que medir, toda semana
8. GEO            →  aparecer no ChatGPT, Gemini, Perplexity
```

**`carrossel`:** `texto → aprovar → foto IA → HTML → PNGs → legenda`

**`publicar-tema` → `aprovar-post`:** `blog draft → carrossel → aprovar → deploy → IG + FB`

---

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

## Chaves de API

Opcionais, conforme o comando. Copie o modelo e preencha só o que for usar:

```bash
cp "${CLAUDE_PLUGIN_ROOT}/skills/businessos/assets/env.example" .businessos/.env
```

| Chave                                                       | Pra qual comando                |
| ----------------------------------------------------------- | ------------------------------- |
| `OPENAI_API_KEY` ou `GEMINI_API_KEY`                        | `carrossel` (foto IA)           |
| `META_PAGE_ACCESS_TOKEN`, `META_PAGE_ID`, `META_IG_USER_ID` | `aprovar-post`                  |
| `SITE_URL`                                                  | `aprovar-post`, `publicar-tema` |

O `.businessos/.env` nunca vai pro git (já está no `.gitignore`).

---

## Pré-requisitos

- **Claude Code** com suporte a plugins.
- **bun** — os scripts rodam com bun.
- **Playwright** — só pra renderizar carrosséis em PNG. Instale uma vez na pasta
  do projeto: `bun add -d playwright && bunx playwright install chromium`.
- **Chaves de API** (opcionais) — veja a tabela acima.

---

## Quando precisar

[mazzeoia.com.br](https://mazzeoia.com.br)
