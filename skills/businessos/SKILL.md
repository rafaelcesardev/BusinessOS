---
name: businessos
description: >
  O sistema operacional do negócio dentro do Claude Code. Use quando o usuário
  quiser criar conteúdo (carrossel, post, blog), rodar SEO/GMB/GEO, montar
  campanha de Google Ads, gerar relatório de anúncios, analisar dados, escrever
  email profissional, responder avaliações do Google, publicar conteúdo, mapear
  rotinas repetíveis em automações, ou configurar o contexto do negócio. Também
  use quando disser "businessos", "/businessos", ou qualquer um dos comandos:
  init, atualizar, mapear-rotinas, carrossel, publicar-tema, aprovar-post, seo,
  responder-avaliacoes, email, anuncio-google, relatorio-ads, analisar-dados.
version: 1.0.0
user-invocable: true
argument-hint: "[init · carrossel|publicar-tema|aprovar-post|seo|responder-avaliacoes|email · anuncio-google|relatorio-ads|analisar-dados · atualizar|mapear-rotinas] [alvo]"
allowed-tools:
  - Bash(bun *)
  - Bash(bunx *)
---

O sistema operacional do negócio: conhece a empresa, fala na voz dela, aplica a
identidade visual e executa marketing, SEO, ads e operação. Instala por cima de
qualquer projeto — o "cérebro" vive em `.businessos/` na pasta do usuário, nunca
sequestra o projeto host.

## Setup (obrigatório antes de qualquer comando)

1. Rode `bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/context.mjs"` uma
   vez por sessão. Se já viu a saída nesta conversa, não rode de novo. O script
   imprime o cérebro do negócio (empresa, preferências, estratégia, identidade)
   como um bloco markdown, ou um diretivo. **Se imprimir `NO_BUSINESSOS`, pare,
   carregue `reference/init.md` e siga a entrevista antes de qualquer outra
   coisa** — exceto se o próprio comando invocado for `init`.
2. Se o usuário invocou um subcomando (`carrossel`, `seo`, `aprovar-post`, ...),
   **leia `reference/<comando>.md` em seguida**. Não-opcional: o reference define
   o fluxo do comando.
3. Use o contexto naturalmente. Não liste os arquivos lidos, não confirme
   leitura. Toda resposta respeita o tom de voz e o "o que evitar" das
   preferências.

Todos os caminhos de script abaixo usam `${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/`.
Rode com `bun`. Nunca recrie um script — eles já existem na pasta `scripts/`.

## Comandos

| Comando | Categoria | O que faz | Reference |
|---|---|---|---|
| `init` | Núcleo | Cria `.businessos/` na pasta atual: entrevista, memória, identidade, perfil | [reference/init.md](reference/init.md) |
| `atualizar` | Núcleo | Reconcilia a memória com a realidade do workspace e propõe edições | [reference/atualizar.md](reference/atualizar.md) |
| `mapear-rotinas` | Núcleo | Mapeia tarefas repetidas e gera automações/skills personalizadas | [reference/mapear-rotinas.md](reference/mapear-rotinas.md) |
| `carrossel` | Conteúdo | Carrossel/post visual com identidade → HTML + PNG 1080×1350 + legenda | [reference/carrossel.md](reference/carrossel.md) |
| `publicar-tema` | Conteúdo | Tema → artigo de blog + carrossel + 3 legendas, tudo amarrado | [reference/publicar-tema.md](reference/publicar-tema.md) |
| `aprovar-post` | Conteúdo | Pipeline de publicação: site + Instagram + Facebook | [reference/aprovar-post.md](reference/aprovar-post.md) |
| `seo` | Conteúdo | Fluxo SEO/GEO/Ads em 8 passos (demanda → GMB → conteúdo → GEO) | [reference/seo.md](reference/seo.md) |
| `responder-avaliacoes` | Conteúdo | Respostas humanas pras reviews do Google (GMB) | [reference/responder-avaliacoes.md](reference/responder-avaliacoes.md) |
| `email` | Conteúdo | Rascunha email calibrando tom ao destinatário e objetivo | [reference/email.md](reference/email.md) |
| `anuncio-google` | Ads | Estrutura completa de campanha Google Ads em CSVs pro Ads Editor | [reference/anuncio-google.md](reference/anuncio-google.md) |
| `relatorio-ads` | Ads | Exports (Google + Meta) → relatório executivo semanal com alertas | [reference/relatorio-ads.md](reference/relatorio-ads.md) |
| `analisar-dados` | Dados | CSV/XLSX/PDF → resumo executivo em prosa | [reference/analisar-dados.md](reference/analisar-dados.md) |

Atalhos: rode `bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/pin.mjs" pin <comando>`
pra criar um `/comando` direto (ex: `/carrossel`). `unpin` remove.

## Routing

1. **Sem argumento**: o usuário pergunta "o que dá pra fazer?". Já rodou
   `context.mjs` no setup. Se reportou `NO_BUSINESSOS`, você está em `init` —
   termine isso. Senão, devolva uma síntese curta do negócio (nome — o que faz;
   foco atual; tom em 3-4 palavras), depois 2-3 comandos de maior valor com uma
   linha de motivo cada, e por fim a tabela completa agrupada por categoria.
   **Nunca auto-execute um comando; a recomendação é sugestão que o usuário
   confirma.**
2. **Primeira palavra casa com um comando**: carregue o reference dele e siga.
   O resto do argumento é o alvo.
3. **Primeira palavra não casa, mas a intenção mapeia claro pra um comando**
   (ex: "faz um post pro insta" → `carrossel`, "responde essa avaliação" →
   `responder-avaliacoes`): carregue o reference e proceda como se invocado. Se
   dois comandos servem, pergunte uma vez qual.
4. **Sem casamento claro**: trate como conversa de negócio usando o contexto
   carregado; ofereça o comando que mais se encaixa.

## Regras de operação (o kernel)

Estas regras valem sempre que um comando BusinessOS roda. Não tocam no
`CLAUDE.md` do projeto host.

**Aprender com correções.** Quando o usuário corrigir algo ou der instrução que
parece permanente ("na verdade é assim", "não faça mais isso", "prefiro assim",
"sempre que…", "evita…", "da próxima vez…"), pergunte: *"Quer que eu salve isso
pra não repetir?"*. Se sim, roteie:
- Sobre o negócio (clientes, serviços, mercado) → `.businessos/memoria/empresa.md`
- Sobre estilo/tom/o que evitar → `.businessos/memoria/preferencias.md`
- Sobre prioridade/foco/prazo → `.businessos/memoria/estrategia.md`
- Sobre visual (cores, fontes, logo) → `.businessos/identidade/design-guide.md`

Salve adicionando uma linha clara, sem reformatar o arquivo todo. Confirme
mostrando a linha. Não pergunte para correção óbvia de contexto imediato — só
quando tiver valor duradouro.

**Manter atualizado.** Ao terminar uma tarefa que mudou contexto relevante
(cliente novo, foco novo, ferramenta nova, identidade nova), pergunte: *"Isso
mudou teu contexto. Quer que eu atualize a memória?"*. Mostre o que muda antes
de salvar. Não pergunte em tarefa pontual (um email avulso, um post). Para
varredura completa, use `atualizar`.

**Criar skills/automações.** Ao concluir uma tarefa sem comando que parece
repetível, pergunte: *"Isso pode virar uma automação pra próxima vez. Quer que
eu crie?"*. Use `mapear-rotinas` pro fluxo completo.

## Estilo visual base

Tarefas visuais (`carrossel`, `publicar-tema`) leem
`.businessos/identidade/design-guide.md` primeiro. Quando ele estiver em branco
ou vago, use os defaults bons de [reference/design.md](reference/design.md) —
**não pare pra pedir `init`** só por causa de visual. O estilo BusinessOS é
editorial, calmo, premium: tipografia clean, fundo escuro + off-white + UMA cor
de destaque, sem clip-art, sem emoji decorativo, sem gradiente arco-íris, sem
template genérico de IA.

## Onde as coisas vivem

- **Cérebro** (dados do negócio, no projeto host): `.businessos/memoria/`,
  `.businessos/identidade/`, `.businessos/config.json`, `.businessos/.env`.
- **Saídas**: `.businessos/saidas/marketing/` (conteudo, seo, campanhas) e
  `.businessos/saidas/` (analises, emails).
- **Motor** (este plugin): `${CLAUDE_PLUGIN_ROOT}/skills/businessos/` com
  `reference/`, `scripts/`, `assets/`.
