# anuncio-google — Estrutura de campanha Google Ads em CSV

Monta a campanha inteira em CSV pronto pro Google Ads Editor. Do briefing direto
pro CSV, sem montar grupo por grupo na interface.

## Lê
- `.businessos/memoria/empresa.md` (produto/serviço, público, região, diferenciais), `preferencias.md` (tom)
- Pesquisa SEO se existir: `.businessos/saidas/marketing/seo/01-pesquisa-demanda.md`, `06-google-ads.md`
- Saídas: `.businessos/saidas/marketing/campanhas/google-ads-<YYYY-MM-DD>/`

## Workflow

### Passo 1 — Briefing
Se não veio briefing nem `06-google-ads.md`, pergunte: produto/serviço, público, região (raio/cidade), orçamento diário, objetivo (ligações/WhatsApp/formulário/visita), site/landing. Se existe `06-google-ads.md`, use como base e pule o que já foi respondido.

### Passo 2 — Palavras-chave
Existe `01-pesquisa-demanda.md` → top 10-20 transacionais/comerciais. Senão, gere 30-50 sementes, WebSearch (concorrência/sazonalidade), filtre comerciais/transacionais, agrupe em clusters.

### Passo 3 — Estrutura (padrão B2B local)
```
Campanha 1: <Negócio> — Search Geral
├── Grupo: <Cluster N>
│   ├── 10-15 keywords (exata/frase/ampla modificada)
│   ├── 3 RSAs
│   └── 10-15 negativas no grupo
Campanha 2: <Negócio> — Local (opcional): Maps + proximidade
Lista de negativas globais: genéricos, marcas concorrentes
```

### Passo 4 — Copies (RSAs)
Por grupo, 3 RSAs. **15 headlines** (5 com keyword, 3 diferenciais, 3 CTA, 2 prova social, 2 valor) — máx **30 chars**. **4 descriptions** (institucional+CTA, técnico+CTA, urgência, prova social) — máx **90 chars**. Sem emoji, sem caps lock, sem repetição, sem superlativo não-comprovado. Tom de `preferencias.md`.

### Passo 5 — Extensões
Sitelinks (4-6), Chamadas (telefone de `empresa.md`), Snippets estruturados, Preço (se aplicável), Promoção (se aplicável).

### Passo 6 — Configurações (`configuracoes.md`)
Estratégia de lance ("Maximizar conversões" pra começar → tCPA com 30+ conv.), orçamento diário, segmentação geográfica (raio), idioma PT, ajustes de dispositivo (tablet -20%), programação, conversões a configurar (WhatsApp, formulário, ligação, tempo no site).

### Passo 7 — CSVs
```
.businessos/saidas/marketing/campanhas/google-ads-<YYYY-MM-DD>/
  campanhas.csv  grupos.csv  keywords.csv  keywords-negativas.csv
  anuncios.csv  extensoes-sitelinks.csv  extensoes-chamadas.csv
  extensoes-snippets.csv  extensoes-preco.csv (se aplicável)
  configuracoes.md  README.md (passo a passo de import)
```
Formato: padrão de importação do Google Ads Editor (Campaign, Ad group, Keyword, Match type, Status, Max CPC, etc.).

### Passo 8 — Resumo + próximos passos
Contagem (campanhas, grupos, keywords +/-, RSAs) + passo a passo de import (Ads Editor → Importar CSV → tudo pausado → conferir conversões → ativar) + sugestão de orçamento inicial.

## Regras
- Nunca inventar CPC (faixa baseada em WebSearch real)
- Sempre começar **pausado**; cliente ativa ao aprovar
- Não anunciar pra termos informacionais
- Match type: Phrase na maioria, Exact pra premium, Broad só com dados
- Lista de negativas global obrigatória · conversões antes de ativar
- Copies seguem `preferencias.md`
