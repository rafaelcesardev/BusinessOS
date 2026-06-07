# BusinessOS — repositório do plugin

Este repositório **é o plugin** BusinessOS do Claude Code. Não é um workspace de
negócio. As regras de operação do BusinessOS (ler memória, aprender com
correções, manter contexto atualizado) vivem dentro do plugin, em
[skills/businessos/SKILL.md](skills/businessos/SKILL.md) — não neste arquivo.

## Arquitetura

- `.claude-plugin/plugin.json` — manifest do plugin · `marketplace.json` — entrada de marketplace.
- `skills/businessos/SKILL.md` — hub: setup, tabela de 12 comandos, routing, kernel de operação.
- `skills/businessos/reference/<comando>.md` — fluxo de cada comando (progressive disclosure). `perfis/` = moldes de memória. `design.md` = estilo visual.
- `skills/businessos/scripts/*.mjs` — scripts self-contained (Node nativo, rodados com `bun`), self-locating via `import.meta.url`. `paths.mjs` resolve o `.businessos/` do projeto host; `context.mjs` imprime o cérebro.
- `skills/businessos/assets/` — `env.example`, catálogos.
- `hooks/session-context.example.json` — hook opt-in inerte (não ativo por padrão).

## Princípios de design (não violar)

- **Overlay, nunca raiz.** O cérebro do negócio vive em `.businessos/` no projeto host, resolvido em runtime a partir do `cwd`. Nunca assumir que a pasta atual é este repo. Nunca sobrescrever o `CLAUDE.md` do host.
- **Self-contained.** Todo script que um comando precisa fica dentro de `skills/businessos/scripts/`. Sem pasta `scripts/` global, sem recriar script a cada uso. Referenciar com `${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/<x>.mjs`.
- **Runtime = bun/bunx.** Não usar `npx`. Playwright é dep de runtime do host (documentada), não vai no plugin.
- **PT-BR correto** em toda doc e output, com acentuação.

## `impeccable`

`.claude/skills/impeccable/` é uma skill de terceiros usada como **referência
arquitetural**. Não faz parte do plugin BusinessOS; não editar.
