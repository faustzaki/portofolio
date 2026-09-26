/**
 * M2.5 — editorial asymmetric mockup frames (one per project).
 * Generates 4 HTML compositions (720×900 logical, captured @2x = 1440×1800 PNG).
 * Each frame encodes the project's identity with the repo design tokens:
 * charcoal #0A0A0C, surface #121518, border #22262B, indigo #5E6AD2, cyan #00F0FF.
 * Asymmetry is per-project (layout grammar differs, not just content swap).
 * Fonts load from ../../src/fonts (repo-local, file:// relative).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "mockups-src");
mkdirSync(OUT, { recursive: true });

const F = (w) => `../../src/fonts/${w}.woff2`;

const head = `
<meta charset="utf-8">
<style>
  @font-face { font-family: Cabinet; src: url('${F("CabinetGrotesk-Bold")}') format('woff2'); font-weight: 700; }
  @font-face { font-family: Cabinet; src: url('${F("CabinetGrotesk-Medium")}') format('woff2'); font-weight: 500; }
  @font-face { font-family: Satoshi; src: url('${F("Satoshi-Regular")}') format('woff2'); font-weight: 400; }
  @font-face { font-family: Satoshi; src: url('${F("Satoshi-Medium")}') format('woff2'); font-weight: 500; }
  @font-face { font-family: Mono; src: url('${F("GeneralSans-Medium")}') format('woff2'); font-weight: 500; }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 720px; height: 900px; overflow: hidden; background: #0A0A0C; color: #EDEDED;
    font-family: Satoshi, sans-serif; -webkit-font-smoothing: antialiased; }
  .mono { font-family: Mono, monospace; }
  .display { font-family: Cabinet, sans-serif; font-weight: 700; letter-spacing: -0.03em; }
  .ghost { position: absolute; font-family: Cabinet, sans-serif; font-weight: 700; color: transparent;
    -webkit-text-stroke: 1px #22262B; line-height: 1; user-select: none; }
  .rule { position: absolute; background: #22262B; }
  .accent-i { color: #5E6AD2; } .accent-c { color: #00F0FF; }
  .surface { background: #121518; border: 1px solid #22262B; }
  .tag { font-family: Mono, monospace; font-size: 11px; letter-spacing: 0.08em; color: #8A8F98;
    border: 1px solid #22262B; padding: 4px 8px; border-radius: 3px; }
</style>`;

const frames = {
  "nusantara-atlas": `
${head}
<body>
  <!-- asymmetric: dominant dot-matrix map field right, editorial type column left -->
  <div class="ghost" style="font-size: 340px; right: -28px; top: -60px;">01</div>
  <div class="rule" style="left: 56px; top: 0; width: 1px; height: 900px;"></div>
  <div style="position:absolute; left: 88px; top: 96px; width: 300px;">
    <div class="mono" style="font-size: 12px; letter-spacing: .18em; color: #5E6AD2;">PROJECT 01 — DATAVIZ</div>
    <h1 class="display" style="font-size: 76px; margin-top: 20px; line-height: .98;">Nusantara<br>Atlas</h1>
    <p style="margin-top: 22px; font-size: 15px; line-height: 1.55; color: #8A8F98;">
      Interactive atlas of Indonesian craft heritage — 340+ villages, live trade data, scroll-choreographed camera.</p>
    <div style="margin-top: 26px; display: flex; gap: 8px; flex-wrap: wrap;">
      <span class="tag">Next.js</span><span class="tag">Mapbox GL</span><span class="tag">D3</span></div>
  </div>
  <!-- dot-matrix archipelago abstraction -->
  <svg width="420" height="620" viewBox="0 0 420 620" style="position:absolute; right: 36px; bottom: 90px;">
    ${Array.from({ length: 26 }, (_, r) =>
      Array.from({ length: 18 }, (_, c) => {
        const x = 12 + c * 22, y = 12 + r * 23;
        const wave = Math.sin(c * 0.55 + r * 0.3) * Math.cos(r * 0.8);
        const on = wave > -0.15 && (c + r) % 7 !== 3;
        if (!on) return "";
        const size = 2 + Math.max(0, wave) * 4.5;
        const fill = wave > 0.72 ? "#00F0FF" : wave > 0.35 ? "#5E6AD2" : "#22262B";
        return `<circle cx="${x}" cy="${y}" r="${size.toFixed(1)}" fill="${fill}"/>`;
      }).join(""),
    ).join("")}
    <line x1="0" y1="470" x2="420" y2="470" stroke="#22262B" stroke-width="1"/>
    <text x="0" y="496" font-family="Mono, monospace" font-size="11" fill="#8A8F98" letter-spacing="2">340+ VILLAGES · 60FPS</text>
  </svg>
  <div class="mono" style="position:absolute; left: 88px; bottom: 64px; font-size: 11px; color: #8A8F98; letter-spacing: .14em;">FAUSTZAKI — 2026 · DESIGN & FRONTEND</div>
</body>`,

  teroka: `
${head}
<body>
  <!-- asymmetric: full-bleed diagonal flow lines, type anchored lower-left -->
  <div class="ghost" style="font-size: 300px; left: -20px; bottom: -70px;">02</div>
  <svg width="720" height="560" viewBox="0 0 720 560" style="position:absolute; top: 0; left: 0;">
    ${Array.from({ length: 22 }, (_, i) => {
      const y0 = 20 + i * 25;
      const amp = 26 + (i % 5) * 9;
      const pts = Array.from({ length: 37 }, (_, k) => {
        const x = k * 20;
        const y = y0 + Math.sin(k * 0.35 + i * 0.6) * amp * Math.sin((k / 36) * Math.PI);
        return `${x},${y.toFixed(1)}`;
      }).join(" ");
      const col = i % 6 === 0 ? "#00F0FF" : i % 3 === 0 ? "#5E6AD2" : "#22262B";
      return `<polyline points="${pts}" fill="none" stroke="${col}" stroke-width="${i % 6 === 0 ? 1.6 : 1}"/>`;
    }).join("")}
  </svg>
  <div class="rule" style="left: 0; top: 560px; width: 720px; height: 1px;"></div>
  <div style="position:absolute; left: 64px; top: 610px; width: 430px;">
    <div class="mono" style="font-size: 12px; letter-spacing: .18em; color: #00F0FF;">PROJECT 02 — WEBGL JOURNAL</div>
    <h1 class="display" style="font-size: 68px; margin-top: 18px; line-height: .98;">Teroka</h1>
    <p style="margin-top: 18px; font-size: 15px; line-height: 1.55; color: #8A8F98;">
      Travel journal that reads like a film — shader-driven dissolves, 12 scroll-scrubbed scenes.</p>
    <div style="margin-top: 22px; display: flex; gap: 8px;">
      <span class="tag">Three.js</span><span class="tag">GLSL</span><span class="tag">Lenis</span><span class="tag">GSAP</span></div>
  </div>
  <div class="mono" style="position:absolute; right: 64px; top: 640px; font-size: 11px; color: #8A8F98; letter-spacing: .14em; text-align: right;">2025<br>CREATIVE DEVELOPER<br>FAUSTZAKI</div>
</body>`,

  ledgr: `
${head}
<body>
  <!-- asymmetric: dense data table block upper-right, narrow type spine left -->
  <div class="ghost" style="font-size: 320px; right: -30px; bottom: -80px;">03</div>
  <div style="position:absolute; left: 64px; top: 88px; width: 260px;">
    <div class="mono" style="font-size: 12px; letter-spacing: .18em; color: #5E6AD2;">PROJECT 03 — FINTECH</div>
    <h1 class="display" style="font-size: 88px; margin-top: 20px; line-height: .95;">Ledgr</h1>
    <p style="margin-top: 20px; font-size: 15px; line-height: 1.55; color: #8A8F98;">
      Cash-flow dashboard with Linear-grade density — 10k rows, zero virtual-scroll jank.</p>
    <div style="margin-top: 24px; display: flex; gap: 8px; flex-wrap: wrap;">
      <span class="tag">React</span><span class="tag">TypeScript</span><span class="tag">tRPC</span></div>
  </div>
  <div class="surface" style="position:absolute; right: 48px; top: 96px; width: 320px; padding: 0;">
    <div class="mono" style="font-size: 10px; letter-spacing: .16em; color: #8A8F98; padding: 12px 16px; border-bottom: 1px solid #22262B;">CASH FLOW — Q3</div>
    ${Array.from({ length: 14 }, (_, i) => {
      const w = 30 + ((i * 37) % 61);
      const pos = i % 4 !== 2;
      return `<div style="display:flex; align-items:center; gap:12px; padding: 9px 16px; border-bottom: 1px solid #15181c;">
        <span class="mono" style="font-size: 10px; color: #8A8F98; width: 34px;">0${(i + 1)}</span>
        <div style="flex:1; height: 6px; background: #15181c; border-radius: 2px;">
          <div style="width:${w}%; height:100%; border-radius:2px; background:${pos ? '#5E6AD2' : '#22262B'}"></div></div>
        <span class="mono" style="font-size: 10px; color: ${pos ? '#EDEDED' : '#8A8F98'};">${pos ? '+' : '−'}${(w * 1.7).toFixed(1)}M</span>
      </div>`;
    }).join("")}
  </div>
  <div class="mono" style="position:absolute; left: 64px; bottom: 64px; font-size: 11px; color: #8A8F98; letter-spacing: .14em;">UI/UX & FRONTEND · 2025 · FAUSTZAKI</div>
</body>`,

  "aria-synth": `
${head}
<body>
  <!-- asymmetric: centered oscilloscope horizon, type split above/below -->
  <div class="ghost" style="font-size: 300px; left: 50%; top: 40px; transform: translateX(-50%);">04</div>
  <div style="position:absolute; left: 0; right: 0; top: 118px; text-align:center;">
    <div class="mono" style="font-size: 12px; letter-spacing: .22em; color: #00F0FF;">PROJECT 04 — AUDIO</div>
    <h1 class="display" style="font-size: 92px; margin-top: 16px; line-height: .95;">Aria Synth</h1>
  </div>
  <svg width="720" height="240" viewBox="0 0 720 240" style="position:absolute; top: 380px; left: 0;">
    <line x1="0" y1="120" x2="720" y2="120" stroke="#22262B" stroke-width="1"/>
    <polyline fill="none" stroke="#00F0FF" stroke-width="2" points="${
      Array.from({ length: 145 }, (_, k) => {
        const x = k * 5;
        const env = Math.exp(-Math.pow((k - 72) / 30, 2));
        const y = 120 + Math.sin(k * 0.55) * 86 * env * (0.7 + 0.3 * Math.sin(k * 0.09));
        return `${x},${y.toFixed(1)}`;
      }).join(" ")
    }"/>
    <polyline fill="none" stroke="#5E6AD2" stroke-width="1" opacity=".55" points="${
      Array.from({ length: 145 }, (_, k) => {
        const x = k * 5;
        const env = Math.exp(-Math.pow((k - 52) / 24, 2));
        const y = 120 + Math.sin(k * 0.38 + 1.4) * 70 * env;
        return `${x},${y.toFixed(1)}`;
      }).join(" ")
    }"/>
  </svg>
  <div style="position:absolute; left: 50%; top: 664px; transform: translateX(-50%); width: 420px; text-align:center;">
    <p style="font-size: 15px; line-height: 1.55; color: #8A8F98;">
      Browser-native polyphonic synthesizer — WebAudio, oscilloscope, MIDI-in.</p>
    <div style="margin-top: 20px; display: flex; gap: 8px; justify-content: center;">
      <span class="tag">WebAudio</span><span class="tag">Canvas</span><span class="tag">React</span></div>
  </div>
  <div class="mono" style="position:absolute; left: 0; right: 0; bottom: 64px; text-align:center; font-size: 11px; color: #8A8F98; letter-spacing: .14em;">SOLO BUILD · 2024 · FAUSTZAKI</div>
</body>`,
};

for (const [id, html] of Object.entries(frames)) {
  writeFileSync(join(OUT, `${id}.html`), html);
}
console.log(`wrote ${Object.keys(frames).length} mockup sources to public/mockups-src/`);
