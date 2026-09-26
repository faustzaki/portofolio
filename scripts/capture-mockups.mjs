/**
 * Capture public/mockups-src/<id>.html → public/mockups/<id>.png @2x (1440×1800).
 * Drives the already-open Hermes browser via CDP. Run after `node scripts/build-mockups.js`.
 */
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const SRC = join(process.cwd(), "public", "mockups-src");
const OUT = join(process.cwd(), "public", "mockups");
mkdirSync(OUT, { recursive: true });

// find CDP target list via /json
const r = spawnSync("curl", ["-s", "http://127.0.0.1:9222/json/version"], { encoding: "utf8" });
if (r.status !== 0 || !r.stdout.includes("webSocketDebuggerUrl")) {
  console.error("No CDP endpoint on 9222. Open the Hermes browser first.");
  process.exit(1);
}

const ids = ["nusantara-atlas", "teroka", "ledgr", "aria-synth"];
const pages = JSON.parse(spawnSync("curl", ["-s", "http://127.0.0.1:9222/json"], { encoding: "utf8" }).stdout);
const page = pages.find((p) => p.type === "page");
if (!page) { console.error("No page target"); process.exit(1); }

import WebSocket from "ws";

const ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
let msgId = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
ws.on("message", (data) => {
  const m = JSON.parse(data);
  if (m.id && pending.has(m.id)) { pending.get(m.id).resolve(m.result ?? m.error); pending.delete(m.id); }
});
await new Promise((res) => ws.on("open", res));

// tiny PNG writer: capture raw RGBA via CDP is unavailable headless-clean, so
// we use Page.captureScreenshot (mimetype png) directly — no encoding needed.
const results = [];
for (const id of ids) {
  const url = "file:///" + join(SRC, `${id}.html`).replace(/\\/g, "/");
  await send("Page.navigate", { url });
  await new Promise((r2) => setTimeout(r2, 700)); // fonts + svg paint
  await send("Emulation.setDeviceMetricsOverride", { width: 720, height: 900, deviceScaleFactor: 2, mobile: false });
  await new Promise((r2) => setTimeout(r2, 250));
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  const buf = Buffer.from(shot.data, "base64");
  const file = join(OUT, `${id}.png`);
  import("node:fs").then((fs) => fs.writeFileSync(file, buf));
  results.push([file, buf.length]);
}
ws.close();
for (const [f, n] of results) console.log(`${f}  ${(n / 1024).toFixed(0)} KB`);
