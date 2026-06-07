# analisar-dados — Análise de arquivo

CSV/XLSX/TXT/JSON/PDF → resumo executivo em prosa. Lê `.businessos/memoria/empresa.md`
(pra entender o que os dados representam) e `preferencias.md` (tom).

## Workflow

### Passo 1 — Contexto
Se não estiver claro: "O que é esse arquivo? (vendas, anúncios, métricas, pesquisa...)" e "Qual a pergunta principal que você quer responder?". Óbvio pelo nome/conteúdo → segue sem perguntar.

### Passo 2 — Ler
Ler o arquivo. XLSX → extrair conteúdo das células com as ferramentas disponíveis.

### Passo 3 — Análise
**O que está bom:** métricas em alta, padrões positivos, top performers. **O que preocupa:** quedas, anomalias, abaixo do esperado, gargalos/desperdícios. **Comparações:** período atual vs anterior, top vs bottom, distribuição. **Insights não óbvios:** correlações, padrões escondidos.

### Passo 4 — Output (prosa, não só listas)
```markdown
# Análise — [Nome do Arquivo]
*[Data]*
## O que esses dados mostram
[2-3 parágrafos de panorama]
## O que está funcionando
[lista com contexto]
## O que merece atenção
[lista com contexto]
## 3 recomendações
1. … 2. … 3. …
## Números-chave
| Métrica | Valor | Contexto |
```
Salvar em `.businessos/saidas/analises/analise-<nome>-<data>.md`. Oferecer export HTML pra compartilhar/apresentar.

## Regras
- Prosa: o usuário entende sem abrir o arquivo original
- Nunca inventar dados; dados incompletos = mencionar antes de analisar
- Tom segue `preferencias.md`
