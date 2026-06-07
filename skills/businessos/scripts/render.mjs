/**
 * Renderiza um carrossel.html em PNGs — um por slide.
 *
 * Uso:
 *   bun render.mjs <html> <outDir> [largura] [altura]
 *
 * Default 1080×1350 (Instagram feed 4:5). Cada `<div class="slide">` vira
 * slide-01.png, slide-02.png, ... em <outDir>.
 *
 * Script único e parametrizado — não existe mais um render.js por pasta de
 * conteúdo. Playwright é dependência de RUNTIME do projeto host (não vai no
 * plugin). Instale uma vez:
 *   bun add -d playwright && bunx playwright install chromium
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

async function loadChromium() {
  try {
    const { chromium } = await import('playwright');
    return chromium;
  } catch {
    console.error(
      'Playwright não encontrado. Rode uma vez, na pasta do projeto:\n' +
        '  bun add -d playwright && bunx playwright install chromium\n' +
        'Depois tente de novo.'
    );
    process.exit(1);
  }
}

async function main() {
  const [, , htmlArg, outArg, wArg, hArg] = process.argv;
  if (!htmlArg || !outArg) {
    console.error('Uso: bun render.mjs <html> <outDir> [largura] [altura]');
    process.exit(1);
  }
  const htmlPath = path.resolve(htmlArg);
  const outDir = path.resolve(outArg);
  const width = parseInt(wArg, 10) || 1080;
  const height = parseInt(hArg, 10) || 1350;

  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML não encontrado: ${htmlPath}`);
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });

  const chromium = await loadChromium();
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });

  const slides = await page.$$('.slide');
  if (slides.length === 0) {
    console.error('Nenhum elemento .slide encontrado no HTML.');
    await browser.close();
    process.exit(1);
  }

  let n = 0;
  for (const slide of slides) {
    n++;
    const file = path.join(outDir, `slide-${String(n).padStart(2, '0')}.png`);
    await slide.screenshot({ path: file });
    console.log(`  ✓ ${file}`);
  }

  await browser.close();
  console.log(`\n${n} slide(s) renderizado(s) em ${outDir} (${width}×${height}).`);
}

main();
