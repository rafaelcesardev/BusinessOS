/**
 * Publica um carrossel no Instagram ou Facebook via Meta Graph API.
 *
 * Uso:
 *   bun postar.mjs <ig|fb> <contentDir> <publicBaseUrl>
 *
 *   contentDir     pasta do conteúdo (tem instagram/slide-NN.png e legenda.md)
 *   publicBaseUrl  URL pública da pasta que serve os PNGs já no ar
 *                  (ex: https://site.com.br/img/posts/<slug>) — a Meta API
 *                  busca cada imagem por URL pública, precisa estar acessível.
 *
 * A API Graph valida a imagem no ar antes de postar; rode só depois do deploy.
 *
 * Chaves lidas de .businessos/.env:
 *   META_PAGE_ACCESS_TOKEN, META_PAGE_ID, META_IG_USER_ID
 *
 * fetch nativo, zero dependência externa.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from './paths.mjs';

const GRAPH = 'https://graph.facebook.com/v21.0';

function slideUrls(contentDir, baseUrl) {
  const igDir = path.join(contentDir, 'instagram');
  const files = fs
    .readdirSync(igDir)
    .filter((f) => /^slide-\d+\.png$/.test(f))
    .sort();
  if (files.length === 0) throw new Error(`Sem slides em ${igDir}`);
  const base = baseUrl.replace(/\/$/, '');
  return files.map((f) => `${base}/${f}`);
}

function caption(contentDir) {
  try {
    return fs.readFileSync(path.join(contentDir, 'legenda.md'), 'utf-8').trim();
  } catch {
    return '';
  }
}

async function graph(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`Meta API: ${JSON.stringify(data.error || data)}`);
  }
  return data;
}

async function postarInstagram(urls, legenda) {
  const igUser = process.env.META_IG_USER_ID;
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  if (!igUser || !token) throw new Error('Falta META_IG_USER_ID / META_PAGE_ACCESS_TOKEN');

  // 1) container por imagem (is_carousel_item)
  const children = [];
  for (const image_url of urls) {
    const c = await graph(`${GRAPH}/${igUser}/media`, {
      image_url,
      is_carousel_item: true,
      access_token: token,
    });
    children.push(c.id);
  }
  // 2) container do carrossel
  const carousel = await graph(`${GRAPH}/${igUser}/media`, {
    media_type: 'CAROUSEL',
    children: children.join(','),
    caption: legenda,
    access_token: token,
  });
  // 3) publica
  const published = await graph(`${GRAPH}/${igUser}/media_publish`, {
    creation_id: carousel.id,
    access_token: token,
  });
  return published.id;
}

async function postarFacebook(urls, legenda) {
  const pageId = process.env.META_PAGE_ID;
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  if (!pageId || !token) throw new Error('Falta META_PAGE_ID / META_PAGE_ACCESS_TOKEN');

  // sobe cada foto sem publicar
  const mediaFbids = [];
  for (const url of urls) {
    const photo = await graph(`${GRAPH}/${pageId}/photos`, {
      url,
      published: false,
      access_token: token,
    });
    mediaFbids.push({ media_fbid: photo.id });
  }
  // post único com as fotos anexadas
  const post = await graph(`${GRAPH}/${pageId}/feed`, {
    message: legenda,
    attached_media: mediaFbids,
    access_token: token,
  });
  return post.id;
}

async function main() {
  const [, , rede, contentArg, baseUrl] = process.argv;
  if (!['ig', 'fb'].includes(rede) || !contentArg || !baseUrl) {
    console.error('Uso: bun postar.mjs <ig|fb> <contentDir> <publicBaseUrl>');
    process.exit(1);
  }
  loadEnv();
  const contentDir = path.resolve(contentArg);
  const urls = slideUrls(contentDir, baseUrl);
  const legenda = caption(contentDir);

  try {
    const id =
      rede === 'ig'
        ? await postarInstagram(urls, legenda)
        : await postarFacebook(urls, legenda);
    console.log(`✓ Publicado em ${rede === 'ig' ? 'Instagram' : 'Facebook'}: ${id}`);
  } catch (e) {
    console.error(`✗ Falha ao postar em ${rede}: ${e.message}`);
    process.exit(1);
  }
}

main();
