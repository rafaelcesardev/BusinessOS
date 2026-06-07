# seo — SEO completo + GEO + Google Ads (8 passos)

Lê `.businessos/memoria/empresa.md`, `preferencias.md`, `estrategia.md`. Usa
WebSearch/WebFetch reais. Saídas em `.businessos/saidas/marketing/seo/`.

Rodar `seo` = executar os 8 passos em sequência, salvando cada output e mostrando
resumo entre eles. Passo único: `seo gmb`, `seo geo`, `seo passo 3`.

### Passo 1 — DEMANDA → `01-pesquisa-demanda.md`
Existe demanda real e como buscam? Extrai produtos/serviços/região/público de `empresa.md`. Gera 30-50 termos-semente (categorias, intenção, localização, uso final). WebSearch por grupo (sazonalidade via trends, SERP, related searches). Classifica por volume estimado / intenção / dificuldade / relevância. Output: tabela classificada + top 10 prioritários (volume + transacional + baixa concorrência) + sazonais + descartados.

### Passo 2 — CONCORRÊNCIA → `02-analise-concorrencia.md`
Top 10 termos: top 5 orgânicos (quem/tipo), Local Pack (avaliações/nota), Ads (copy). WebFetch em 5-8 concorrentes: estrutura, meta tags, profundidade, schema, GMB. Identifica gaps / oportunidades / ameaças / benchmark mínimo. Output: tabela de concorrentes + mapa de gaps + onde atacar primeiro.

### Passo 3 — GMB → `03-google-meu-negocio.md`
Perfil Google Business completo: básicas (nome, categorias, endereço, telefone, horário, área), descrição otimizada (750 chars, tom de `preferencias.md`), atributos/serviços, checklist de fotos, 4 posts iniciais + calendário, estratégia de avaliações (usar `responder-avaliacoes`), citações/diretórios com NAP consistente.

### Passo 4 — ON-PAGE → `04-otimizacao-on-page.md`
Lê estrutura do site (config `site` ou pergunta). Por página: mapeamento de keyword, meta tags (title 50-60, description 150-160, H1/H2/H3), Schema JSON-LD (LocalBusiness, Product, FAQ), checklist técnico (URLs, alt, velocidade, mobile, sitemap/robots/canonical/OG), internal linking. Output: tabela página→keyword→title→description→H1 + schema pronto + checklist com status.

### Passo 5 — CONTEÚDO → `05-estrategia-conteudo.md`
Posts evergreen (5-10 ideias com título/keyword/headings/tamanho), cluster (pilar + satélites + internal linking), calendário editorial (prioridade, frequência, formato), conteúdo local. **Insumo do comando `publicar-tema`** — cada item vira artigo + carrossel + legendas.

### Passo 6 — GOOGLE ADS → `06-google-ads.md`
Objetivo (leads/visitas/alcance local). Estrutura Search (1 grupo por cluster, 10-15 keywords, negativas, 3 RSAs, extensões), Local/Display opcional. Copies seguindo `preferencias.md`: 15 headlines, 4 descriptions. Avaliar landing page. **Consumido pelo comando `anuncio-google`** (gera o CSV).

### Passo 7 — MONITORAMENTO → `07-checklist-monitoramento.md`
Semanal (posição top 10, responder avaliações, postar GMB). Mensal (métricas via `relatorio-ads`, Search Console, negativas, publicar conteúdo, citações). Trimestral (refazer concorrência, atualizar GMB, revisar estratégia, novas keywords).

### Passo 8 — GEO → `08-geo-otimizacao-ia.md`
Aparecer em ChatGPT/Gemini/Perplexity. Auditoria GEO (testar top 10 em IAs, ver quem aparece e fontes citadas). Conteúdo pra IA (respostas diretas nas primeiras linhas, dados concretos, Q&A como H2/H3). FAQ Schema JSON-LD (5-10 perguntas reais). Citações externas (diretórios, avaliações, guest posts, mídia). Dados estruturados reforçados. Monitoramento a cada 30 dias.

## Execução final
Resumo executivo: top 5 oportunidades, ações prioritárias, estimativa de investimento em ads, próximos passos.

## Regras
- Pesquisa sempre real (WebSearch/WebFetch), nunca inventar volume/concorrência/CPC
- Copies seguem `preferencias.md`; termos em PT-BR como o público busca
- Dado não obtível (volume exato) = deixar claro que é estimativa e explicar a lógica
- Foco em intenção comercial/transacional; schema em JSON-LD
