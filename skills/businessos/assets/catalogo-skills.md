# Catálogo de Skills

Skills externas prontas pra instalar. Use como referência ao criar automações novas com `mapear-rotinas`, ou instale diretamente as que fizerem sentido pro seu negócio.

> Skills globais ficam em `~/.claude/skills/` e funcionam em qualquer projeto.
> Skills locais ficam em `.claude/skills/` e só funcionam nesse projeto.

---

## Escrever copy e textos de venda

### Schwartz Copy (resposta direta)
**O que faz:** Escreve copy de vendas usando a metodologia de Eugene Schwartz (Breakthrough Advertising). Diagnostica o nível de consciência e sofisticação do mercado antes de gerar qualquer texto.
**Bom pra:** Landing pages, emails de venda, VSLs, cartas de venda, páginas de captura
**Como instalar:** Já vem como skill global. Chamar com `/schwartz-copy`
**Fonte:** Skill validada pelo BusinessOS

### Ogilvy Copy (marca e posicionamento)
**O que faz:** Gera copy institucional usando a metodologia de David Ogilvy. Pesquisa profunda, big idea, headlines informativas.
**Bom pra:** Manifestos de marca, campanhas institucionais, taglines, brand voice, posicionamento
**Como instalar:** Já vem como skill global. Chamar com `/ogilvy-copy`
**Fonte:** Skill validada pelo BusinessOS

---

## Criar interfaces e páginas web

### Frontend Design
**O que faz:** Cria interfaces web completas com design de alta qualidade. Gera código HTML/CSS/React pronto pra usar, com visual profissional que foge da estética genérica de IA.
**Bom pra:** Landing pages, dashboards, componentes web, páginas de produto
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/frontend-design`
**Fonte:** Skill nativa do Claude Code

---

## Criar visuais e arte

### Canvas Design
**O que faz:** Cria arte visual em PNG e PDF usando princípios de design. Posters, capas, peças gráficas.
**Bom pra:** Capas de ebook, banners, peças visuais, thumbnails
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/canvas-design`
**Fonte:** Skill nativa do Claude Code

---

## Trabalhar com documentos

### PDF
**O que faz:** Manipula PDFs: extrai texto e tabelas, cria novos, junta/separa documentos, preenche formulários.
**Bom pra:** Extrair dados de contratos, criar relatórios em PDF, preencher formulários
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/pdf`
**Fonte:** Skill nativa do Claude Code

### DOCX
**O que faz:** Cria e edita documentos Word com formatação, tracked changes e comentários.
**Bom pra:** Propostas formais, contratos, documentos pra clientes que pedem Word
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/docx`
**Fonte:** Skill nativa do Claude Code

### PPTX
**O que faz:** Cria e edita apresentações PowerPoint com layouts, speaker notes e formatação.
**Bom pra:** Apresentações pra clientes, decks de vendas, materiais de treinamento
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/pptx`
**Fonte:** Skill nativa do Claude Code

### XLSX
**O que faz:** Cria e edita planilhas com fórmulas, formatação e gráficos.
**Bom pra:** Relatórios financeiros, dashboards em planilha, análise de dados
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/xlsx`
**Fonte:** Skill nativa do Claude Code

---

## Escrever documentos e specs

### Doc Co-Authoring
**O que faz:** Fluxo guiado pra coescrever documentos. Te entrevista, itera rascunhos, e valida que o documento funciona pro leitor.
**Bom pra:** Propostas técnicas, specs, documentos de decisão, SOPs
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/doc-coauthoring`
**Fonte:** Skill nativa do Claude Code

---

## Extrair transcrição de vídeo

### YT Transcript
**O que faz:** Extrai transcrições de vídeos do YouTube usando yt-dlp. Suporta múltiplos idiomas.
**Bom pra:** Criar conteúdo a partir de vídeos (carrosséis, newsletters, posts)
**Precisa de:** yt-dlp instalado (`brew install yt-dlp`)
**Como instalar:** Já vem como skill global. Chamar com `/yt-transcript`
**Fonte:** Skill validada pelo BusinessOS

---

## Testar sites e apps

### Webapp Testing
**O que faz:** Testa aplicações web locais usando Playwright. Captura screenshots, verifica funcionalidade, lê logs do browser.
**Bom pra:** Testar landing pages antes de publicar, verificar se tudo funciona em diferentes tamanhos
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/webapp-testing`
**Fonte:** Skill nativa do Claude Code

---

## Criar skills novas

### Skill Creator
**O que faz:** Guia pra criar skills novas do zero. Ajuda a estruturar, definir triggers, e testar.
**Bom pra:** Quando o `mapear-rotinas` não cobre o que você precisa e quer criar algo mais complexo
**Como instalar:** Já vem nativo no Claude Code. Chamar com `/skill-creator`
**Fonte:** Skill nativa do Claude Code

---

## Como adicionar skills novas a este catálogo

Se você testou uma skill e quer adicionar aqui pra referência futura:

```markdown
### Nome da Skill
**O que faz:** [descrição em uma frase]
**Bom pra:** [casos de uso práticos]
**Como instalar:** [comando ou instrução]
**Fonte:** [de onde veio — skill nativa, criada por você, ou de terceiros]
```
