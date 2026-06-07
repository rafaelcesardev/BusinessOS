# atualizar — Varredura e reconciliação do contexto

Compara a memória (`.businessos/memoria/`) com o estado real do workspace e propõe
atualizações cirúrgicas. Sob demanda — o fluxo natural já aprende com correções
(ver kernel no SKILL.md); este comando faz a varredura completa.

## Workflow

### Passo 1 — Levantamento
- Estrutura do projeto host (pastas, arquivos recentes dos últimos 30 dias)
- Saídas recentes em `.businessos/saidas/` (conteudo, seo, campanhas, analises)
- `config.json` (site detectado, provider) bate com a realidade?

### Passo 2 — Comparação
- `memoria/empresa.md`: clientes / serviços / ferramentas batem com o que existe?
- `memoria/estrategia.md`: foco atual ainda faz sentido (datas, prioridades)?
- `identidade/design-guide.md`: coerente com as últimas peças geradas?

### Passo 3 — Proposta
```
Encontrei [N] coisas pra atualizar:
1. memoria/empresa.md — falta "Acme" (vi conteúdo gerado pra Acme em [data])
2. memoria/estrategia.md — fala em "fechar 1º cliente em fevereiro", já é abril
Aplico? (todas / algumas / nenhuma)
```

### Passo 4 — Aplicação
Aprovado → editar cirúrgico (só a linha relevante, sem reformatar). Mostrar o diff de cada mudança.

## Regras
- Não inventar fatos — só o que tem evidência no workspace
- Evidência ambígua (pasta vazia "Cliente Novo") → perguntar antes
- Não apagar conteúdo da memória — só atualizar/adicionar
- Nada a mudar → "Tá tudo coerente, nada pra atualizar"
- Nunca tocar no `CLAUDE.md` do projeto host
