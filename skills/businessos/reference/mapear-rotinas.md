# mapear-rotinas — Mapear tarefas repetidas em automações

Descobre o que o usuário repete e transforma em comando/skill personalizada.

## Workflow

### Passo 1 — Entrevista (3 perguntas, uma por vez)
1. "Quais 3 tarefas você repete toda semana e queria não pensar mais? (ex: criar carrossel, mandar relatório pro cliente, fazer briefing)"
2. "Pra cada uma, qual o input típico? (link, planilha, nome de cliente)"
3. "E o output esperado? (5 slides PNG, email pronto, PDF resumo)"

### Passo 2 — Conferir catálogos
Ler `${CLAUDE_PLUGIN_ROOT}/skills/businessos/assets/catalogo-skills.md` e `catalogo-ferramentas.md`. Se a tarefa já é coberta por skill nativa/comando existente, sugerir usar em vez de criar: *"A tarefa X já é resolvida por `/<nome>`. Quer usar essa em vez de criar nova?"*

### Passo 3 — Proposta
Pra cada tarefa sem cobertura:
```
### <nome-da-skill>
**O que faz:** [uma frase]
**Input:** […]   **Output:** […]
**Dependências:** [arquivos de .businessos/, ferramentas externas]
```
Mostrar todas juntas: *"Quais quer que eu crie agora? (todas / algumas / nenhuma / com ajustes)"*

### Passo 4 — Criar as aprovadas
Pra cada uma, criar uma skill local em `.claude/skills/<nome>/SKILL.md` no projeto host:
- Frontmatter: `name`, `description` (quando invocar — sem isso a skill nunca é achada), `user-invocable: true`
- Workflow em passos, dependências, regras claras
- Arquivos de apoio (templates/exemplos) dentro da pasta da skill
- Calibrar tom/regras por `.businessos/memoria/preferencias.md` e `empresa.md`

Se a skill precisar de script, **coloque o script DENTRO da pasta da skill** (`.claude/skills/<nome>/scripts/`), não numa pasta global. Auto-contida.

### Passo 5 — Resumo
```
Criei [N] skills:
✓ /<nome> — .claude/skills/<nome>/SKILL.md
Pra usar: digita / e o nome. Pra ajustar: edita o SKILL.md.
```

## Regras
- Não criar skill pra tarefa de uma vez só — tem que ser repetível
- Máx 5 por sessão (mais → dividir em rodadas)
- Cada skill com trigger claro na `description`
- Dependência de ferramenta que o usuário não tem → avisar antes e oferecer versão simplificada
