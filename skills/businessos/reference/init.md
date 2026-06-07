# init — Instalação do BusinessOS no projeto atual

Primeiro comando depois de instalar o plugin. Cria o "cérebro" do negócio em
`.businessos/` **na pasta atual** (`process.cwd()`) — funciona igual se o plugin
está instalado global (`~/.claude`) ou por projeto. `cd` na pasta do negócio,
roda, pronto. Não pode falhar nem soar burocrático: trata como conversa de
descoberta, uma pergunta por vez.

**Não sequestra o projeto host.** Nunca sobrescreve o `CLAUDE.md` do projeto.
Todo o contexto vive isolado em `.businessos/`.

## Pré-checagem

Rode `bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/context.mjs"`. Se já
existe `.businessos/` preenchido, pergunte: *"Já tem contexto aqui. Sobrescrevo
(do zero) ou complemento o que falta?"*. Setup limpo → segue direto.

## Fase 1 — Perfil

Pergunte qual perfil combina (determina o molde de contexto em `reference/perfis/`):

1. **Solopreneur / criador solo** — uma pessoa, marca pessoal + negócio
2. **Freelancer** — atende clientes, organiza por projeto/cliente
3. **Agência / consultoria** — equipe entregando pra vários clientes
4. **Empresa** — estabelecida, com setores

## Fase 2 — Entrevista (uma pergunta por vez)

**Negócio:**
1. "Como você chama o que faz? (nome da empresa, ou seu nome se for marca pessoal)"
2. "O que sua empresa entrega, numa frase do jeito que você falaria pro vizinho?"
3. "Quem te paga? (perfil de cliente real, sem persona genérica)"
4. "Toca sozinho ou tem equipe? Se tem, quantos e fazendo o quê?"

**Voz:**
5. "Cola um exemplo da tua escrita — legenda, email pra cliente, qualquer coisa real e recente."
6. "O que te dá ranço quando alguém escreve? (ex: 'vamos juntos!', 'caro cliente', 'alavancar', 'sinergia')"

**Foco:**
7. "Qual o gargalo do negócio hoje? O que segura o crescimento?"
8. "Se eu tirasse UMA coisa que você repete toda semana das tuas costas, qual seria?"

**Identidade:**
9. "Tem identidade visual definida ou tá no zero? Se tem, passa as cores e a fonte."
10. "Tem logo? Se sim, joga em `.businessos/identidade/logo.png` (ou `.svg`) e confirma."

## Fase 3 — Criar `.businessos/` e preencher

Crie a estrutura na pasta atual:

```
.businessos/
  memoria/empresa.md  preferencias.md  estrategia.md
  identidade/design-guide.md
  config.json
  .env                      ← copie de ${CLAUDE_PLUGIN_ROOT}/skills/businessos/assets/env.example
  saidas/                   ← marketing/, analises/, emails/ criadas sob demanda
```

- `memoria/empresa.md` — perguntas 1-4 (nome, o que faz, perfil de cliente, equipe).
- `memoria/preferencias.md` — perguntas 5-6: **Tom de voz** (derivado do exemplo real), **O que evitar** (lista da 6), **Estilo geral**.
- `memoria/estrategia.md` — perguntas 7-8: **Gargalo atual**, **Pra tirar das costas** (candidata a `mapear-rotinas`), **Próximas prioridades**.
- `identidade/design-guide.md` — perguntas 9-10. Se não forneceu, deixe em branco e avise: *"Deixei o design-guide em branco. As skills visuais usam defaults bons; preenche quando tiver identidade própria."*
- `config.json` — `{ "perfil": "<perfil>", "imagem": { "provider": "openai" }, "site": {} }`. Detecte o site depois (publicar-tema/aprovar-post preenchem `site`).

Use o molde `reference/perfis/<perfil>.md` pra calibrar a estrutura.

**Não escreva avisos de placeholder nos arquivos finais.** Preencha com o conteúdo real.

## Fase 4 — Kernel opt-in (sem sobrescrever)

Pergunte: *"Quer que eu deixe o BusinessOS sempre ativo neste projeto?"*
- **Opção A (recomendada):** nada a fazer — cada comando carrega o contexto no
  setup automaticamente.
- **Opção B:** anexar um bloco curto ao `CLAUDE.md` do host (criar se não existe),
  apontando pro `.businessos/`. **Só com permissão explícita. Nunca sobrescrever.**

## Fase 5 — Resumo

```
✓ Perfil: [perfil]
✓ Cérebro criado em .businessos/
  - memoria/empresa.md · preferencias.md · estrategia.md
  - identidade/design-guide.md  [preenchida | em branco]
  - config.json · .env (preencher chaves quando for usar carrossel/aprovar-post)
```

Mencione: *"Você disse que repete '<resposta 8>' toda semana. Quando quiser tirar
isso das costas, roda `mapear-rotinas`."* Ofereça atalhos: `pin.mjs pin carrossel`
cria `/carrossel` direto.

## Regras

- Não inventar dados — resposta vaga, registra como veio.
- Setup dura 5-7 min. Se enrolar numa pergunta, registra o que tem e segue.
- `.businessos/.env` deve entrar no `.gitignore` do host — avise se o host versiona.
