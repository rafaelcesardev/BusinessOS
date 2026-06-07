# aprovar-post — Pipeline de aprovação e publicação

Ponte entre o conteúdo aprovado (blog + carrossel + legendas, do `publicar-tema`)
e a publicação real: site → Instagram → Facebook.

## Quando NÃO usar
Conteúdo não criado → `publicar-tema` primeiro. Usuário ainda revisando → não rodar até ele dizer "aprovado". Site/Meta não configurados → seguir setup abaixo.

## Pré-requisitos (uma vez)
- `.businessos/.env` com `META_PAGE_ACCESS_TOKEN`, `META_PAGE_ID`, `META_IG_USER_ID`, `SITE_URL`
- Site com deploy automático a partir do `main` (Netlify, Vercel, etc.)
- Conta Insta Business conectada à Página FB, com permissões no Meta App
- Caminhos do site em `.businessos/config.json` → `site` (ver detecção em [publicar-tema.md](publicar-tema.md))

Faltando algo → parar e apontar o setup.

## Argumento
`aprovar-post <slug>` (nome do arquivo do blog sem `.md`). Sem slug → listar blogs em `draft: true` e perguntar.

## Workflow

### Passo 1 — Localizar
- Blog: `<config.site.path>/<slug>.md`
- Carrossel: `.businessos/saidas/marketing/conteudo/<slug>-*`
- Validar PNGs em `<pasta>/instagram/slide-XX.png` (2-10) + `legenda.md` (+ `legenda-linkedin.md`). Faltou algo → parar e relatar.

### Passo 2 — Confirmação final
Mostrar: título do blog, nº de slides, primeiras 200 chars da legenda, URL final. Perguntar **"Confirma publicação? (sim/não)"**. Só seguir com sim.

### Passo 3 — Flipar draft
Frontmatter do blog: `draft: true` → `draft: false`.

### Passo 4 — Copiar PNGs pro site
Origem: `.businessos/saidas/marketing/conteudo/<slug>-<data>/instagram/slide-*.png`
Destino: `<config.site.publicImg>/<slug>/slide-*.png` (criar pasta; sobrescrever se re-publicação).

### Passo 5 — Commit + push
```bash
git add <config.site.path>/<slug>.md <config.site.publicImg>/<slug>/
git commit -m "publicar: <título do blog>"
git push origin main
```

### Passo 6 — Aguardar deploy
Deploy (Netlify/Vercel) ~1-2 min. Validar HTTP 200 (timeout 5 min):
```bash
curl -sf -o /dev/null -w "%{http_code}" "$SITE_URL/blog/$slug/"
curl -sf -o /dev/null -w "%{http_code}" "$SITE_URL/img/posts/$slug/slide-01.png"
```
A Meta API busca a imagem por URL pública — sem isso, falha.

### Passo 7 — Instagram
```bash
bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/postar.mjs" ig \
  ".businessos/saidas/marketing/conteudo/<slug>-<data>" \
  "$SITE_URL/img/posts/<slug>"
```
Capturar o post id. Se falhar, **não seguir pro Facebook** — relatar e parar.

### Passo 8 — Facebook
```bash
bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/postar.mjs" fb \
  ".businessos/saidas/marketing/conteudo/<slug>-<data>" \
  "$SITE_URL/img/posts/<slug>"
```

### Passo 9 — LinkedIn (manual)
Mostrar o conteúdo de `legenda-linkedin.md` pro usuário colar manualmente.

### Passo 10 — Resumo
```
✓ Post publicado: <título>
Site:      <SITE_URL>/blog/<slug>/
Instagram: <link>     Facebook: <link>
LinkedIn:  pendente — texto pronto em legenda-linkedin.md
```

## Tratamento de erro
- Push falhou: rollback do `draft: false`, relata, para
- Deploy não subiu em 5 min: relata, pergunta se continua ou aborta
- Insta falhou: para e relata (site já no ar, só o feed que não foi)
- FB falhou mas Insta OK: relata, sugere tentar só o FB depois

## Princípios
Confirmação humana antes de qualquer coisa irreversível (nunca pular Passo 2) · idempotente (re-rodar detecta publicação prévia e pergunta) · falha cedo e alto · logar cada passo.
