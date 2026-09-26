// ponytail: one-shot font fetcher — run once, delete when fonts vendored.
import fs from "node:fs";
import path from "node:path";

const wants = [
  ["cabinet-grotesk", 400, "CabinetGrotesk-Regular"],
  ["cabinet-grotesk", 500, "CabinetGrotesk-Medium"],
  ["cabinet-grotesk", 700, "CabinetGrotesk-Bold"],
  ["satoshi", 400, "Satoshi-Regular"],
  ["satoshi", 500, "Satoshi-Medium"],
  ["satoshi", 700, "Satoshi-Bold"],
  ["general-sans", 400, "GeneralSans-Regular"],
  ["general-sans", 500, "GeneralSans-Medium"],
  ["general-sans", 600, "GeneralSans-Semibold"],
  ["general-sans", 700, "GeneralSans-Bold"],
];

const outDir = path.join(__dirname, "..", "src", "fonts");
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const [family, weight, name] of wants) {
    const cssUrl = `https://api.fontshare.com/v2/css?f[]=${family}@${weight}`;
    const css = await (await fetch(cssUrl, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
    const m = css.match(/url\('?(\/\/cdn\.fontshare\.com[^')]+\.woff2)'?\)/);
    if (!m) throw new Error(`no woff2 for ${family} ${weight}`);
    const url = "https:" + m[1];
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    fs.writeFileSync(path.join(outDir, `${name}.woff2`), buf);
    console.log(`${name}.woff2  ${buf.length} bytes`);
  }
})();
