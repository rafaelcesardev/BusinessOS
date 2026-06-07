# Catálogo de Ferramentas

Referência de APIs, CLIs e conectores que podem ser usados dentro dos comandos do BusinessOS.
Consulte este arquivo antes de criar automações novas pra saber o que já está disponível.

---

## Criar visuais (HTML pra PNG)

### Playwright
**O que faz:** Renderiza qualquer HTML em imagem PNG (carrosséis, slides, propostas, cards)
**Precisa de conta:** Não, roda local
**Como instalar (uma vez, no projeto host):**
```bash
bun add -d playwright
bunx playwright install chromium
```
**Como usar:** o script `render.mjs` do plugin já cuida disso:
```bash
bun "${CLAUDE_PLUGIN_ROOT}/skills/businessos/scripts/render.mjs" carrossel.html instagram/ 1080 1350
```
**Tamanhos comuns:**
- Instagram feed: 1080x1350
- Instagram/TikTok story: 1080x1920
- Slide 16:9: 1920x1080
- Card quadrado: 1080x1080

---

## Publicar na web

### Cloudflare Pages API
**O que faz:** Publica arquivos HTML com link público (propostas, landing pages, estudos)
**Precisa de conta:** Sim, Cloudflare (grátis)
**Configurar:** Salvar `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` no `.businessos/.env`
**Quando usar:** Sempre que um comando gerar um HTML que precisa ser compartilhado por link

---

## Publicar em redes sociais

### Meta Graph API (Instagram + Facebook)
**O que faz:** Publica carrosséis no Instagram e Facebook (usado por `aprovar-post`)
**Precisa de conta:** Sim, Meta Business + token de longa duração
**Configurar:** `META_PAGE_ACCESS_TOKEN`, `META_PAGE_ID`, `META_IG_USER_ID` no `.businessos/.env`
**Como usar:** o script `postar.mjs` do plugin já cuida disso
**Quando usar:** Publicação automática de conteúdo visual

### Post for Me API
**O que faz:** Publica posts no Instagram e TikTok direto do Claude Code (alternativa à Meta API)
**Precisa de conta:** Sim, postforme.dev
**Configurar:** Salvar `POSTFORME_API_KEY` no `.businessos/.env`
**Quando usar:** Quando preferir um intermediário em vez de configurar a Meta API direto

---

## Buscar conteúdo da web

### WebFetch (nativo)
**O que faz:** Lê o conteúdo de qualquer URL e traz como texto
**Precisa de conta:** Não, já vem no Claude Code
**Quando usar:** Pesquisa de referências, ler artigos, buscar dados de sites

### WebSearch (nativo)
**O que faz:** Pesquisa na web e traz resultados
**Precisa de conta:** Não, já vem no Claude Code
**Quando usar:** Quando o usuário precisa pesquisar antes de criar conteúdo

### Jina Reader
**O que faz:** Converte qualquer URL em markdown limpo (melhor que WebFetch pra artigos longos)
**Precisa de conta:** Não
**Como usar:** Acessar `https://r.jina.ai/{URL}` via WebFetch
**Quando usar:** Extrair texto de artigos, blog posts, páginas com muito HTML

---

## Extrair conteúdo de vídeo

### yt-dlp (CLI)
**O que faz:** Baixa transcrições/legendas de vídeos do YouTube
**Precisa de conta:** Não, roda local
**Como instalar:**
```bash
brew install yt-dlp
```
**Quando usar:** Comandos que partem de um vídeo pra criar conteúdo (carrossel, newsletter, roteiro)

---

## Gerar imagens com IA

### Gemini (Google AI)
**O que faz:** Gera imagens a partir de texto
**Precisa de conta:** Sim, Google AI Studio (grátis até certo limite)
**Configurar:** Salvar `GEMINI_API_KEY` no `.businessos/.env` e `imagem.provider: gemini` no config.json
**Quando usar:** Capas, ilustrações, imagens pra posts

### OpenAI (gpt-image)
**O que faz:** Gera imagens a partir de texto
**Precisa de conta:** Sim, OpenAI (pago)
**Configurar:** Salvar `OPENAI_API_KEY` no `.businessos/.env` (provider default)
**Quando usar:** Alternativa ao Gemini pra geração de imagens

---

## Conectar com plataformas (MCPs)

MCPs são conectores que dão acesso direto a plataformas dentro do Claude Code.
O Claude passa a usar esses conectores automaticamente quando fizer sentido.

Pra verificar quais MCPs já estão instalados: `claude mcp list`
Pra remover um MCP: `claude mcp remove nome-do-mcp`

### Notion
**O que faz:** Acessa projetos, bases de dados, briefings e tarefas do Notion
**Precisa de conta:** Sim, API key em notion.so/my-integrations
**Como instalar:**
```bash
claude mcp add notion -- npx -y @notionhq/notion-mcp-server
```
**Quando usar:** Comandos que precisam ler/escrever tarefas, bases de clientes, documentos

### Gmail
**O que faz:** Lê e compõe emails sem sair do Claude Code
**Precisa de conta:** Sim, OAuth Google
**Quando usar:** Comandos de email, follow-up, comunicação com clientes

### Google Calendar
**O que faz:** Vê agenda, cria eventos e encontra horários disponíveis
**Precisa de conta:** Sim, OAuth Google
**Quando usar:** Comandos de agendamento, planejamento, organização de reuniões

### Canva
**O que faz:** Acessa designs, cria novos assets visuais direto pelo Claude
**Precisa de conta:** Sim, Canva Pro
**Quando usar:** Comandos de design, criação visual, materiais de marca

### Facebook Ads (Meta) / Google Ads
**O que faz:** Gerencia campanhas e busca dados de performance
**Precisa de conta:** Sim, credenciais da plataforma
**Quando usar:** Comandos de gestão de mídia paga, relatórios de performance

### Supabase
**O que faz:** Banco de dados e backend completo
**Precisa de conta:** Sim, projeto Supabase
**Quando usar:** Comandos que precisam guardar dados, autenticação, backend

### Telegram
**O que faz:** Envia e recebe mensagens via bot do Telegram
**Precisa de conta:** Sim, bot token do BotFather
**Quando usar:** Comandos de notificação, comunicação automática

---

## Como adicionar ferramentas novas

Se você usa uma API ou ferramenta que não está nessa lista, adicione aqui seguindo o formato:

```markdown
### Nome da Ferramenta
**O que faz:** [descrição em uma frase]
**Precisa de conta:** [Sim/Não]
**Configurar:** [o que salvar no .businessos/.env, se aplicável]
**Como usar:** [comando ou instrução]
**Quando usar:** [em que tipo de comando faz sentido]
```
