# BusinessOS

> O sistema operacional do seu negócio dentro do Claude Code.

BusinessOS é um **plugin do Claude Code**. Você instala uma vez e ele passa a
funcionar **por cima de qualquer projeto** — seu site, seu app, uma pasta vazia,
tanto faz. Não vira a raiz do projeto, não sequestra nada: o "cérebro" do negócio
vive isolado numa pasta `.businessos/` dentro da pasta onde você está trabalhando.

Em alguns minutos sua empresa ganha memória própria, identidade visual aplicada
em tudo que o sistema gera, e 12 comandos prontos pra marketing, SEO, ads e
operação — com você dirigindo.

---

## Instalar

O BusinessOS é distribuído como plugin via marketplace. No Claude Code:

```
/plugin marketplace add rafaelcesardev/BusinessOS
/plugin install businessos@businessos-marketplace
```

Pronto. O plugin fica disponível em **qualquer projeto** — instalado globalmente,
não precisa copiar nada pra cada repositório.

## Usar

Entre na pasta do seu negócio (ou do seu site) e configure o contexto:

```
/businessos init
```

Ele entrevista você sobre a empresa, tom de voz, foco e identidade, e cria a pasta
`.businessos/` ali mesmo. **Funciona na pasta atual, sempre** — seja a raiz de um
site Astro que já roda, seja uma pasta nova. Não mexe no seu projeto.

Depois é só chamar os comandos:

```
/businessos                 → menu do que dá pra fazer agora
/businessos carrossel       → carrossel 1080×1350 com a identidade da marca
/businessos seo             → fluxo SEO/GEO/Ads em 8 passos
/businessos publicar-tema   → artigo de blog + carrossel + 3 legendas
/businessos relatorio-ads   → relatório semanal de Google + Meta Ads
```

Quer os comandos diretos (sem o prefixo)? Crie atalhos:

```
bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/pin.mjs" pin carrossel
```

Agora `/carrossel` funciona direto.

---

## Os comandos

**Núcleo** — `init` (configura o `.businessos/` na pasta atual) · `atualizar`
(reconcilia a memória com a realidade) · `mapear-rotinas` (transforma o que você
repete em automações).

**Conteúdo e SEO** — `carrossel` · `publicar-tema` · `aprovar-post` (publica
site + Instagram + Facebook) · `seo` · `responder-avaliacoes` · `email`.

**Anúncios e dados** — `anuncio-google` (CSV pro Google Ads Editor) ·
`relatorio-ads` · `analisar-dados`.

📖 **Documentação completa de cada comando, com exemplos: [COMANDOS.md](COMANDOS.md).**

---

## Como o BusinessOS pensa

```
.businessos/              ← o cérebro, na pasta do seu projeto
  memoria/                ← quem é a empresa, como fala, o foco da semana
  identidade/             ← cores, fontes, logo — aplicados em todo visual
  config.json  .env       ← caminhos do site, chaves de API
  saidas/                 ← tudo que o sistema produz
```

O Claude lê o cérebro a cada comando. Quanto melhor a memória, melhor o sistema.
Toda peça visual respeita a identidade. O resultado fica versionado com o seu
projeto, é seu.

O motor (skills, scripts, referências) vive no plugin e **atualiza** com
`/plugin` — você recebe melhorias sem refazer nada.

---

## Pré-requisitos

- **Claude Code** com suporte a plugins.
- **bun** (os scripts rodam com bun).
- **Playwright** — só pra renderizar carrosséis em PNG. Instale uma vez na pasta
  do projeto: `bun add -d playwright && bunx playwright install chromium`.
- **Chaves de API** (opcionais, conforme o comando): preencha `.businessos/.env`
  a partir do modelo em `skills/businessos/assets/env.example`.

---

## A tese

IA não é uma ferramenta que sua empresa usa. É o sistema operacional em que ela
roda. Cada processo crítico que hoje roda em open loop (decide → executa → não
mede → repete cego) vira closed loop dentro do BusinessOS (decide → executa →
captura → realimenta → ajusta). O sistema não substitui você. Vira parte da sua
empresa.

## Quando precisar

[mazzeoia.com.br](https://mazzeoia.com.br)
