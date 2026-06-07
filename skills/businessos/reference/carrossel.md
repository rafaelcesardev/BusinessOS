# carrossel — Carrossel e posts visuais

Pega um tema → entrega HTMLs estilizados + PNGs prontos pra postar + legenda no
padrão da marca. Lê regras visuais em [design.md](design.md) e
`.businessos/identidade/design-guide.md`.

## Saídas

`.businessos/saidas/marketing/conteudo/<tipo>-<tema>-<YYYY-MM-DD>/`

## Tipos de conteúdo

1. **CARROSSEL TEXTO PURO** — educacional, dicas, listas. 1080x1350. Tipografia clean, cores alternadas, sem fotos.
2. **CARROSSEL COM FOTO** — aspiracional, capa com personagem. Foto IA (gerada) ou real (do usuário) com gradient overlay.
3. **POST ÚNICO** — frase de impacto, dado, depoimento. Citação / número grande / foto com overlay.

Se o tipo não estiver claro: *"Que tipo? (1) carrossel texto, (2) carrossel com foto, (3) post único"*.

Formato sempre **1080x1350 (4:5)**. TikTok/Reels 1080x1920 (9:16) só quando pedido explicitamente.

## Workflow

### Passo 1 — Entender e planejar
Setup já carregou empresa/preferências/identidade. Identifique o tipo, o tema e o ângulo. Considere a sequência de capas do feed (ver [design.md](design.md)).

### Passo 2 — Texto
**Carrossel (5-10 slides):**
- Slide 1 (Capa): título impactante, máx 8 palavras. Oferecer 3 opções.
- Internos: um insight por slide, frases naturais, sem bullet seco.
- Final: CTA + logo.

**Post único:** frase principal em destaque + contexto + CTA sutil.

Linguagem segue `.businessos/memoria/preferencias.md` estritamente — sem jargão de marketing, sem corporativês. Fala como o público fala.

**CHECKPOINT:** mostrar o texto completo. Esperar aprovação antes do visual.

### Passo 3 — Fotos (só tipo 2)
Só se o usuário pediu foto IA. Monte prompt em inglês:

```
Professional [TIPO] photography of [ASSUNTO], [DETALHES], [AMBIENTE],
[ESTILO DE LUZ] lighting, shallow depth of field, shot from [ÂNGULO],
[ESTÉTICA], editorial quality
```

Gere com o script (chaves em `.businessos/.env`):
```bash
bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/gerar-imagem.mjs" "PROMPT" ".businessos/saidas/marketing/conteudo/<pasta>/foto-<nome>.png"
```
Provider vem de `.businessos/config.json` (`imagem.provider`: openai|gemini). Mostre a foto. **CHECKPOINT:** foto aprovada → segue. Senão, ajusta prompt e regenera.

Nunca gerar rostos identificáveis de pessoas reais.

### Passo 4 — Visuais (HTML + PNG)
1. Criar **um único `carrossel.html`** com TODOS os slides como `<div class="slide">`. Inline CSS, Google Fonts a única dependência externa. Aplicar cores/tipografia de [design.md](design.md), mínimo 2 layouts diferentes, logo top-left + counter top-right, slide final na cor principal.

   Foto IA no HTML:
   ```html
   <div class="slide" style="background-image: linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.7)), url('foto-xxx.png'); background-size: cover; background-position: center;">
     <div class="content"><h2>Texto sobre a foto</h2></div>
   </div>
   ```

2. Renderizar com o script único (parametrizado — não criar render.js por pasta):
   ```bash
   bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/render.mjs" \
     ".businessos/saidas/marketing/conteudo/<pasta>/carrossel.html" \
     ".businessos/saidas/marketing/conteudo/<pasta>/instagram" 1080 1350
   ```
   Playwright é dep de runtime do host: `bun add -d playwright && bunx playwright install chromium` (uma vez).

3. Mostrar slide 1, 2 e o CTA final. Se aprovado, mostrar os intermediários.

### Passo 5 — Legenda (sempre, automática)
Ao terminar os PNGs, gerar `legenda.md` na mesma pasta **sem o usuário pedir**:
1. Hook (pergunta ou afirmação)
2. Contexto (1-2 frases)
3. CTA pra arrastar ("Arraste pro lado e confere")
4. Bloco de oferta (diferenciais, contato)
5. Hashtags (10-15 — público + nicho + local)

### Passo 6 — Estrutura final
```
.businessos/saidas/marketing/conteudo/<tipo>-<tema>-<YYYY-MM-DD>/
  texto.md  foto-<nome>.png (se houver)
  carrossel.html
  instagram/slide-01.png → slide-NN.png
  tiktok/ (se 9:16 pedido)
  legenda.md   legenda-linkedin.md (se pedido)
```

### Passo 7 — Conexão com blog (opcional)
*"Esse conteúdo dá pra virar artigo no blog pra SEO. Quero que eu crie a versão blog?"* → se sim, `publicar-tema` com o mesmo tema.

## Regras
- Sempre ler identidade antes de criar visual; 1080x1350 sempre (9:16 só se pedido)
- Linguagem segue preferências estritamente
- Considerar sequência de capa no feed antes de definir capa nova
- Legenda automática ao final
- Foto IA: prompt em inglês, aprovação antes de usar, nunca rostos identificáveis
- Um único `carrossel.html` + render via script único parametrizado. Inline CSS
- Não repetir layout entre slides
