// node tools/social/build.js  -> escreve assets/social/queue.json e tools/social/render.devbrowser.js
// Depois: dev-browser --headless < tools/social/render.devbrowser.js  (gera os JPGs no temp do dev-browser)
const fs = require('fs');
const path = require('path');
const { posts, CTA, TAGS, WA } = require('./posts');

const SITE = 'https://www.urbancleanfl.com/assets/social/';
const ROOT = path.join(__dirname, '..', '..');

// O workflow n8n escolhe queue[diasDesde(2026-09-07) % 30]. Rotaciona a lista para
// que posts[0] saia em START (primeiro dia do lote novo).
const START = process.env.START || '2026-10-15';
const dayIndex = Math.round((Date.parse(START) - Date.UTC(2026, 8, 7)) / 86400000);

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function card(p) {
  const top = `<div class="pill">${esc(p.label)}</div><h1>${esc(p.headline)}</h1>`;
  let mid = '';
  if (p.type === 'card') mid = `<div class="accent">${esc(p.accent)}</div><p>${esc(p.body)}</p>`;
  if (p.type === 'list') mid = `<ul>${p.items.map(i => `<li><span>✓</span>${esc(i)}</li>`).join('')}</ul>`;
  if (p.type === 'price') mid = `<div class="rows">${p.rows.map(([a, b]) => `<div class="row"><span>${esc(a)}</span><b>${esc(b)}</b></div>`).join('')}</div><p class="note">${esc(p.note)}</p>`;
  const tag = p.slug.endsWith('-es') ? 'Davenport y Florida Central · Asegurados' : 'Davenport &amp; Central Florida · Insured';
  return `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
body{font-family:"Segoe UI",system-ui,sans-serif;color:#fff;display:flex;flex-direction:column;align-items:center;text-align:center;
 background:radial-gradient(circle at 75% 15%,rgba(40,120,170,.18),transparent 45%),linear-gradient(180deg,#0b3a55 0%,#0a2a40 55%,#081d2e 100%)}
main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 110px;gap:34px}
.pill{border:3px solid #1aa0e6;color:#1aa0e6;border-radius:40px;padding:10px 26px;font-weight:800;font-size:31px;letter-spacing:.5px}
h1{font-family:"Segoe UI Black","Segoe UI",sans-serif;font-weight:900;font-size:86px;line-height:1.08}
.accent{font-family:"Segoe UI Black","Segoe UI",sans-serif;font-weight:900;font-size:104px;line-height:1.05;color:#ff7a45}
p{font-size:40px;line-height:1.35;color:#a9c3d6;font-weight:300}
ul{list-style:none;text-align:left;display:flex;flex-direction:column;gap:26px;margin-top:6px}
li{font-size:44px;font-weight:600;display:flex;gap:22px;align-items:baseline}
li span{color:#ff7a45;font-weight:900}
.rows{width:100%;display:flex;flex-direction:column;gap:18px;margin-top:6px}
.row{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid rgba(169,195,214,.25);padding:14px 10px;font-size:48px}
.row b{font-family:"Segoe UI Black","Segoe UI",sans-serif;color:#ff7a45;font-size:70px}
.note{font-size:32px}
footer{width:820px;border-top:2px solid rgba(169,195,214,.3);padding:34px 0 46px}
footer b{font-family:"Segoe UI Black","Segoe UI",sans-serif;font-size:44px;display:block}
footer small{font-size:29px;color:#a9c3d6}
</style></head><body><main>${top}${mid}</main><footer><b>@urbancleanfl</b><small>${tag}</small></footer></body></html>`;
}

function caption(p, i) {
  const [ctaEn, ctaEs] = p.cta || CTA[i % CTA.length];
  return `${p.en}\n\n—\n\n${p.es}\n\n${ctaEn}\n${ctaEs}\n${WA}\n\n${TAGS[i % TAGS.length]}`;
}

if (posts.length !== 30) throw new Error(`esperado 30 posts, veio ${posts.length}`);
const items = posts.map((p, i) => {
  const file = p.type === 'photo' ? p.slug : `${p.slug}.jpg`;
  return { kind: p.kind, lang: 'bi', image: SITE + file, caption: caption(p, i), targets: ['fb', 'ig'], _file: file };
});
const n = items.length;
const queue = new Array(n);
items.forEach((it, i) => { queue[(dayIndex + i) % n] = it; });
queue.forEach((q, k) => { q.slot = k + 1; });

fs.writeFileSync(path.join(ROOT, 'assets/social/queue.json'),
  JSON.stringify(queue.map(({ _file, ...q }) => ({ slot: q.slot, ...q })), null, 2) + '\n');

const toRender = posts.filter(p => p.type !== 'photo').map(p => ({ name: `${p.slug}.jpg`, html: card(p) }));
fs.writeFileSync(path.join(__dirname, 'render.devbrowser.js'),
`const cards = ${JSON.stringify(toRender)};
const page = await browser.getPage("social-render");
await page.setViewportSize({ width: 1080, height: 1350 });
for (const c of cards) {
  await page.setContent(c.html);
  const buf = await page.screenshot({ type: "jpeg", quality: 92 });
  console.log(await saveScreenshot(buf, c.name));
}
`);

// Calendario para conferencia
const d0 = Date.parse(START);
items.forEach((it, i) => {
  const d = new Date(d0 + i * 86400000).toISOString().slice(0, 10);
  console.log(d, it._file, '|', it.caption.split('\n')[0].slice(0, 70), `(${it.caption.length} ch)`);
});
