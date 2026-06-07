# relatorio-ads — Relatório semanal de Google Ads + Meta Ads

Transforma exports brutos em relatório executivo que o dono entende sem abrir a
interface das plataformas.

## Lê
- `.businessos/memoria/empresa.md`, `estrategia.md`, `preferencias.md`
- Inputs: CSVs do Google Ads e/ou Meta Ads (print também aceito — transcrever)
- Histórico: `.businessos/saidas/marketing/campanhas/relatorios/`

## Como rodar
Usuário aponta os arquivos (ex: `relatorio-ads dados/google-2026-05-12.csv dados/meta-2026-05-12.csv`) ou só `relatorio-ads` e a skill pergunta onde estão.

## Workflow

### Passo 1 — Ler exports
Google: Campanha, Grupo, Impressões, Cliques, CTR, CPC médio, Custo, Conversões, CPA, Conv. rate. Meta: Campanha, Conjunto, Impressões, Alcance, Cliques no link, CTR, CPM, Frequência, Custo, Resultados, Custo por resultado. Faltou coluna crítica → avisa e segue só com tráfego.

### Passo 2 — Comparar com semana anterior
Busca o relatório anterior em `relatorios/`. Calcula variação SoS: investimento, cliques/impressões, CTR, CPC/CPM, conversões totais, CPA, custo por canal. Sem anterior → baseline.

### Passo 3 — Resumo executivo (topo, leitura 2 min)
```markdown
# Relatório de Ads — semana <DD/MM> a <DD/MM>
## Resumo executivo
**Investimento:** R$ X.XXX (▼/▲ Y%)   **Conversões:** N (▼/▲ Y%)   **CPA:** R$ X (▼/▲ Y%)
**Canais:** Google R$X → N conv (CPA R$X) · Meta R$X → N conv (CPA R$X)
**Headline da semana:** 1 frase do que mais importa.
```

### Passo 4 — Detalhamento por canal
Top 3 e Bottom 3 campanhas/grupos (CPA/conv. rate). Top/Bottom criativos (Meta). Keywords com mais custo e zero conversão (Google → negativas).

### Passo 5 — Alertas
🔴 queima de orçamento (gastou >R$X, 0 conv) · 🔴 CTR caiu >30% · 🟡 frequência Meta >3.0 · 🟡 conv. rate <1% em Search · 🟡 CPC +20% · 🟢 oportunidade (performance acima da média, orçamento limitado).

### Passo 6 — Recomendações (3-5 concretas)
"Pausar Grupo X — gastou R$230 sem conversão" > "otimizar campanhas". Nome, valor, motivo.

### Passo 7 — Salvar
`.businessos/saidas/marketing/campanhas/relatorios/<YYYY-MM-DD>-relatorio.md` com frontmatter (periodo_inicio/fim, investimento_total, conversoes_total, cpa_medio, canais) pra comparação futura.

### Passo 8 — Entrega
Resumo executivo no chat (Passos 3+5+6) + aponta o arquivo. Oferece enviar por email (chama `email`).

## Regras
- Nunca inventar números (export truncado = "dados incompletos")
- Comparação é o que importa; número solto não significa nada
- Alertas em ordem (vermelho → amarelo → verde)
- Linguagem do dono (`preferencias.md`); traduzir CPM/CTR/CPA se ele não domina
- Frequência Meta boa: 1.5-3.0; >4.0 vira ruído
- Reportar perda sem amenizar
