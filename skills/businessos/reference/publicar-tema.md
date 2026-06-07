# publicar-tema — Pipeline de conteúdo SEO + redes sociais

Orquestra: tema → artigo de blog + carrossel resumo + 3 legendas (Insta, FB,
LinkedIn), tudo amarrado. **Blog é a peça-mãe**; carrossel e legendas derivam dele.

## Lê
- Estratégia de conteúdo: `.businessos/saidas/marketing/seo/05-estrategia-conteudo.md` (do `seo`)
- Pesquisas: `.businessos/saidas/marketing/seo/01-pesquisa-demanda.md`, `02-analise-concorrencia.md`, `08-geo-otimizacao-ia.md`
- Site (blog): caminho em `.businessos/config.json` → `site.path`. **Se vazio, detecte** (ver "Detecção do site"). Se não houver site, pergunte antes.

## Detecção do site
Antes de escrever o blog, resolva o destino:
1. Leia `.businessos/config.json` → `site`. Se preenchido, use.
2. Senão, procure no projeto host: `src/content/blog/` (Astro), `content/`/`_posts/` (Hugo/Jekyll), `app/blog/`. Confirme o stack pelo `package.json`/config do host.
3. Pergunte e grave em `config.json`: `{ "site": { "path": "src/content/blog", "publicImg": "public/img/posts", "stack": "astro", "url": "https://..." } }`.

## Workflow

### Passo 0 — Tema
Tema explícito → usa. Senão, lê `05-estrategia-conteudo.md`, lista satélites + pilar, pergunta qual. Marca os que já viraram blog (checar a pasta do blog) pra não duplicar.

### Passo 1 — Pesquisa rápida
Keyword principal + variações (`01`), como concorrentes tratam (`02` — fugir do óbvio), ângulo GEO (`08` — perguntas que IAs respondem).

### Passo 2 — Blog post
**Destino:** `<site.path>/<slug>.md`. **Slug:** kebab-case curto sem stopwords.

Frontmatter (se o stack usa markdown):
```yaml
---
title: "Título atrativo, próximo da keyword"
description: "Meta description 150-160 caracteres, com keyword e benefício"
publishedAt: YYYY-MM-DD
author: "<nome de .businessos/memoria/empresa.md>"
keywords: [keyword principal, variação 1, variação 2]
draft: true
---
```
**Sempre `draft: true`.** O usuário flipa pra `false` ao aprovar (ou usa `aprovar-post`).

Estrutura (800-1500 palavras): lead concreto → H2 explicativo → H2 prático → H2 detalhe (opcional) → H2 onde a empresa se encaixa (sem propaganda) → CTA final. Regras de escrita seguem `.businessos/memoria/preferencias.md`: sem jargão, frases curtas, concreto (números, datas), markdown limpo.

### Passo 3 — Carrossel resumo
Sem perguntar, parte pro carrossel (tipo 1 texto puro) seguindo [carrossel.md](carrossel.md). Pasta: `.businessos/saidas/marketing/conteudo/<slug>-<YYYY-MM-DD>/`. Capa = título do blog; slides 2-6 = pontos-chave; slide final = CTA pro blog (`<url>/blog/<slug>`). Capa respeita sequência do feed.

### Passo 4 — Legendas (3)
Em `.businessos/saidas/marketing/conteudo/<pasta>/`:
- `legenda.md` (Insta + FB): hook + 2-3 parágrafos naturais + CTA arrastar + CTA blog + bloco oferta + 10-15 hashtags
- `legenda-linkedin.md` (mais formal, sem "arraste", máx 3 hashtags, fecha com 1 linha de quem é a empresa)

### Passo 5 — Resumo de entrega
```
✓ Blog: <site.path>/<slug>.md (draft)
✓ Carrossel: .businessos/saidas/marketing/conteudo/<pasta>/ (carrossel.html + instagram/)
✓ Legendas: legenda.md (Insta+FB) · legenda-linkedin.md

Pra publicar: revisar blog → aprovar-post (publica site + Insta + FB) ou manual.
```

## Quando NÃO usar
Carrossel avulso → `carrossel`. Atualizar artigo existente → editar o .md direto.

## Princípios
Blog é a peça-mãe · tudo conectado (carrossel linka blog, blog tem CTA) · draft sempre · linguagem do público real.
