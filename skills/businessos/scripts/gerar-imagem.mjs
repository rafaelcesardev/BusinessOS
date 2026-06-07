/**
 * Gera uma imagem por IA e salva em PNG.
 *
 * Uso:
 *   bun gerar-imagem.mjs "<prompt>" <outPath> [provider]
 *
 * provider: openai (default) | gemini. Se omitido, usa config.json
 * (.businessos/config.json → imagem.provider) ou openai.
 *
 * Chaves lidas de .businessos/.env:
 *   OPENAI_API_KEY  (provider openai)
 *   GEMINI_API_KEY  (provider gemini)
 *
 * fetch nativo, zero dependência externa.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv, readConfig } from './paths.mjs';

async function gerarOpenAI(prompt, outPath) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.error('Falta OPENAI_API_KEY no .businessos/.env');
    process.exit(1);
  }
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-1',
      prompt,
      size: '1024x1536',
      n: 1,
    }),
  });
  if (!res.ok) {
    console.error(`OpenAI erro ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) {
    console.error('Resposta da OpenAI sem imagem.');
    process.exit(1);
  }
  fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
}

async function gerarGemini(prompt, outPath) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error('Falta GEMINI_API_KEY no .businessos/.env');
    process.exit(1);
  }
  const model = 'gemini-2.5-flash-image';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );
  if (!res.ok) {
    console.error(`Gemini erro ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data);
  if (!img) {
    console.error('Resposta do Gemini sem imagem.');
    process.exit(1);
  }
  fs.writeFileSync(outPath, Buffer.from(img.inlineData.data, 'base64'));
}

async function main() {
  const [, , prompt, outArg, providerArg] = process.argv;
  if (!prompt || !outArg) {
    console.error('Uso: bun gerar-imagem.mjs "<prompt>" <outPath> [openai|gemini]');
    process.exit(1);
  }
  loadEnv();
  const config = readConfig();
  const provider = providerArg || config?.imagem?.provider || 'openai';
  const outPath = path.resolve(outArg);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  if (provider === 'gemini') {
    await gerarGemini(prompt, outPath);
  } else {
    await gerarOpenAI(prompt, outPath);
  }
  console.log(`✓ Imagem salva: ${outPath} (provider: ${provider})`);
}

main();
