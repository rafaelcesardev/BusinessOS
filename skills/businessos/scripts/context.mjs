/**
 * Carregador de contexto do BusinessOS.
 *
 * Imprime o "cérebro" do negócio (memória + identidade) como um bloco markdown
 * em stdout, ou um diretivo NO_BUSINESSOS quando a pasta `.businessos/` ainda
 * não existe / está em branco. O hub (SKILL.md) roda isto no setup, uma vez por
 * sessão, e ramifica conforme a saída — igual ao context.mjs do impeccable.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  findBusinessosDir,
  getMemoriaDir,
  getIdentidadeDir,
  readConfig,
} from './paths.mjs';

/**
 * Um arquivo de memória conta como "preenchido" se tem conteúdo real além dos
 * rótulos do template. Heurística: existe e tem ≥ 40 caracteres não-brancos
 * fora de linhas de cabeçalho/citação/rótulo-vazio.
 */
function isFilled(filePath) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return false;
  }
  const meaningful = raw
    .split('\n')
    .filter((l) => {
      const t = l.trim();
      if (!t) return false;
      if (t.startsWith('#') || t.startsWith('>')) return false;
      // rótulo de template vazio tipo "**Nome:**" sem valor depois
      if (/^\*\*[^*]+:\*\*\s*$/.test(t)) return false;
      return true;
    })
    .join('')
    .replace(/\s+/g, '');
  return meaningful.length >= 40;
}

function safeRead(p) {
  try {
    return fs.readFileSync(p, 'utf-8');
  } catch {
    return null;
  }
}

export function loadContext(cwd = process.cwd()) {
  const root = findBusinessosDir(cwd);
  if (!root) {
    return { exists: false, filled: false, cwd };
  }
  const memoriaDir = getMemoriaDir(cwd);
  const identidadeDir = getIdentidadeDir(cwd);

  const empresa = safeRead(path.join(memoriaDir, 'empresa.md'));
  const preferencias = safeRead(path.join(memoriaDir, 'preferencias.md'));
  const estrategia = safeRead(path.join(memoriaDir, 'estrategia.md'));
  const designGuide = safeRead(path.join(identidadeDir, 'design-guide.md'));

  return {
    exists: true,
    filled: isFilled(path.join(memoriaDir, 'empresa.md')),
    root,
    empresa,
    preferencias,
    estrategia,
    designGuide,
    designGuideFilled: isFilled(path.join(identidadeDir, 'design-guide.md')),
    config: readConfig(cwd),
    cwd,
  };
}

function cli() {
  const ctx = loadContext(process.cwd());

  if (!ctx.exists || !ctx.filled) {
    process.stdout.write(
      'NO_BUSINESSOS: Este projeto ainda não tem o cérebro do BusinessOS ' +
        '(pasta `.businessos/` ausente ou em branco). Pare a tarefa atual, ' +
        'carregue `reference/init.md` e siga a entrevista para criar o ' +
        '`.businessos/` antes de continuar.\n'
    );
    process.exit(0);
  }

  const parts = [];
  if (ctx.empresa) parts.push(ctx.empresa.trim());
  if (ctx.preferencias) parts.push(ctx.preferencias.trim());
  if (ctx.estrategia) parts.push(ctx.estrategia.trim());
  if (ctx.designGuideFilled && ctx.designGuide) {
    parts.push(ctx.designGuide.trim());
  } else {
    parts.push(
      'NOTA: `identidade/design-guide.md` está em branco. As skills visuais ' +
        '(carrossel, publicar-tema) usam os defaults bons embutidos; só vira ' +
        'problema se o usuário quiser identidade própria — aí mande preencher.'
    );
  }

  if (ctx.config && ctx.config.site && ctx.config.site.path) {
    parts.push(
      `CONFIG: caminho do site detectado = \`${ctx.config.site.path}\` ` +
        `(stack: ${ctx.config.site.stack || 'desconhecido'}). Usado por ` +
        `publicar-tema e aprovar-post.`
    );
  }

  process.stdout.write(parts.join('\n\n---\n\n') + '\n');
}

function invokedAsScript() {
  const arg = process.argv[1];
  if (!arg) return false;
  try {
    return fs.realpathSync(arg) === fs.realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (invokedAsScript()) {
  cli();
}
