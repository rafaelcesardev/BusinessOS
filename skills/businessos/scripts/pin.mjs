#!/usr/bin/env bun
/**
 * Pin/unpin de comandos como atalhos de skill standalone.
 *
 * Uso:
 *   bun pin.mjs pin <comando>
 *   bun pin.mjs unpin <comando>
 *
 * `pin carrossel` cria uma skill /carrossel leve que redireciona pra
 * /businessos carrossel. `unpin carrossel` remove. Escreve em todas as pastas
 * de harness presentes no projeto (.claude/skills, .cursor/skills, etc.).
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';

const HARNESS_DIRS = [
  '.claude', '.cursor', '.gemini', '.codex', '.agents',
  '.trae', '.trae-cn', '.pi', '.opencode', '.kiro', '.rovodev',
];

const VALID_COMMANDS = [
  'init', 'atualizar', 'mapear-rotinas',
  'carrossel', 'publicar-tema', 'aprovar-post', 'seo',
  'responder-avaliacoes', 'email',
  'anuncio-google', 'relatorio-ads', 'analisar-dados',
];

const PIN_MARKER = '<!-- businessos-pinned-skill -->';

function findProjectRoot(startDir = process.cwd()) {
  let dir = resolve(startDir);
  while (dir !== '/') {
    if (
      existsSync(join(dir, 'package.json')) ||
      existsSync(join(dir, '.git')) ||
      existsSync(join(dir, '.businessos'))
    ) {
      return dir;
    }
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return resolve(startDir);
}

/** Pastas de skills dos harnesses presentes no projeto. */
function findHarnessDirs(projectRoot) {
  const dirs = [];
  for (const harness of HARNESS_DIRS) {
    const harnessRoot = join(projectRoot, harness);
    if (existsSync(harnessRoot)) {
      dirs.push(join(harnessRoot, 'skills'));
    }
  }
  // fallback: se nenhum harness existe, cria .claude/skills
  if (dirs.length === 0) dirs.push(join(projectRoot, '.claude', 'skills'));
  return dirs;
}

function generatePinnedSkill(command) {
  return `---
name: ${command}
description: "Atalho para /businessos ${command}."
argument-hint: "[alvo]"
user-invocable: true
---

${PIN_MARKER}

Atalho para \`/businessos ${command}\`.

Invoque /businessos ${command}, repassando os argumentos fornecidos aqui, e siga as instruções.
`;
}

function pin(command, projectRoot) {
  const content = generatePinnedSkill(command);
  let created = 0;
  for (const skillsDir of findHarnessDirs(projectRoot)) {
    const skillDir = join(skillsDir, command);
    const existingMd = join(skillDir, 'SKILL.md');
    if (existsSync(existingMd)) {
      const existing = readFileSync(existingMd, 'utf-8');
      if (!existing.includes(PIN_MARKER)) {
        console.log(`  PULA: ${skillDir} (já existe skill não-pinada)`);
        continue;
      }
    }
    mkdirSync(skillDir, { recursive: true });
    writeFileSync(existingMd, content, 'utf-8');
    console.log(`  + ${skillDir}`);
    created++;
  }
  if (created > 0) {
    console.log(`\nAtalho '${command}' criado em ${created} local(is). Use /${command} direto.`);
  }
  return created > 0;
}

function unpin(command, projectRoot) {
  let removed = 0;
  for (const skillsDir of findHarnessDirs(projectRoot)) {
    const skillDir = join(skillsDir, command);
    const skillMd = join(skillDir, 'SKILL.md');
    if (!existsSync(skillMd)) continue;
    if (!readFileSync(skillMd, 'utf-8').includes(PIN_MARKER)) {
      console.log(`  PULA: ${skillDir} (não é atalho pinado)`);
      continue;
    }
    rmSync(skillDir, { recursive: true, force: true });
    console.log(`  - ${skillDir}`);
    removed++;
  }
  console.log(removed > 0 ? `\nAtalho '${command}' removido.` : `Nenhum atalho '${command}' encontrado.`);
  return removed > 0;
}

const [, , action, command] = process.argv;

if (!action || !command) {
  console.log('Uso: bun pin.mjs <pin|unpin> <comando>');
  console.log(`\nComandos: ${VALID_COMMANDS.join(', ')}`);
  process.exit(1);
}
if (action !== 'pin' && action !== 'unpin') {
  console.error(`Ação inválida: ${action}. Use 'pin' ou 'unpin'.`);
  process.exit(1);
}
if (!VALID_COMMANDS.includes(command)) {
  console.error(`Comando inválido: ${command}`);
  console.error(`Comandos: ${VALID_COMMANDS.join(', ')}`);
  process.exit(1);
}

const root = findProjectRoot();
if (action === 'pin') pin(command, root);
else unpin(command, root);
