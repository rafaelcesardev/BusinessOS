/**
 * Resolução de caminhos do BusinessOS.
 *
 * O "cérebro" do negócio vive numa pasta `.businessos/` DENTRO do projeto host
 * (não na raiz do plugin). Este módulo descobre essa pasta a partir do cwd,
 * subindo a árvore até a raiz do projeto — overlay, não raiz. Espelha o
 * `resolveContextDir()` do impeccable, mas para um diretório namespaced.
 *
 * Install-location-agnostic: funciona igual com o plugin instalado global
 * (~/.claude) ou por projeto. O que importa é a pasta atual do usuário.
 */
import fs from 'node:fs';
import path from 'node:path';

export const BUSINESSOS_DIR = '.businessos';

/** Marcadores de raiz de projeto, para limitar a subida na árvore. */
const ROOT_MARKERS = ['.git', 'package.json', 'deno.json', 'go.mod', 'Cargo.toml'];

/**
 * Acha a pasta `.businessos/` existente mais próxima, subindo do cwd.
 * Retorna o caminho absoluto, ou null se nenhuma existir até a raiz.
 */
export function findBusinessosDir(cwd = process.cwd()) {
  let dir = path.resolve(cwd);
  while (true) {
    const candidate = path.join(dir, BUSINESSOS_DIR);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      return candidate;
    }
    if (ROOT_MARKERS.some((m) => fs.existsSync(path.join(dir, m)))) {
      // chegou na raiz do projeto sem achar — para aqui
      break;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

/**
 * Caminho onde o `.businessos/` deve ficar: a pasta existente, ou o default
 * (cwd/.businessos) quando ainda não foi criado. Use para escrever no init.
 */
export function getBusinessosDir(cwd = process.cwd()) {
  return findBusinessosDir(cwd) || path.join(path.resolve(cwd), BUSINESSOS_DIR);
}

export function getMemoriaDir(cwd = process.cwd()) {
  return path.join(getBusinessosDir(cwd), 'memoria');
}

export function getIdentidadeDir(cwd = process.cwd()) {
  return path.join(getBusinessosDir(cwd), 'identidade');
}

export function getSaidasDir(cwd = process.cwd()) {
  return path.join(getBusinessosDir(cwd), 'saidas');
}

export function getConfigPath(cwd = process.cwd()) {
  return path.join(getBusinessosDir(cwd), 'config.json');
}

export function getEnvPath(cwd = process.cwd()) {
  return path.join(getBusinessosDir(cwd), '.env');
}

export function readConfig(cwd = process.cwd()) {
  try {
    return JSON.parse(fs.readFileSync(getConfigPath(cwd), 'utf-8'));
  } catch {
    return {};
  }
}

export function writeConfig(config, cwd = process.cwd()) {
  const p = getConfigPath(cwd);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(config, null, 2) + '\n');
  return p;
}

/**
 * Lê `.businessos/.env` e injeta em process.env (sem sobrescrever o que já
 * existe no ambiente). Parser simples KEY=VALUE, sem dependência externa.
 * Retorna o objeto de pares lidos.
 */
export function loadEnv(cwd = process.cwd()) {
  const out = {};
  let raw;
  try {
    raw = fs.readFileSync(getEnvPath(cwd), 'utf-8');
  } catch {
    return out;
  }
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
    if (process.env[key] === undefined) process.env[key] = val;
  }
  return out;
}
