/**
 * M2.5 — Showcase hover-reveal preview clips (3–5s, muted, loopable).
 * 480×600 (4:5 editorial portrait), 24fps, 3.5s, H.264 yuv420p, faststart.
 * Each clip is a procedural grayscale pattern (geq) tinted toward the
 * showcase accent #00F0FF, matching the project's identity:
 *   01 nusantara-atlas → drifting topographic contour rings + scan band
 *   02 teroka          → diagonal interference flow (shader-dissolve vibe)
 *   03 ledgr           → quantized dashboard cells flickering in steps
 *   04 aria-synth      → oscilloscope trace with breathing amplitude
 * ponytail: MP4-only (H.264 plays everywhere incl. Safari); add a WebM twin
 * per clip in this loop if a target browser ever needs it.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const OUT = join(process.cwd(), "public", "previews");
const TMP = join(process.cwd(), "scripts", ".build-tmp");
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

const D = 3.5; // seconds — inside the 3–5s spec
const W = 480, H = 600, FPS = 24;

// geq luma expressions. T = N / FPS. st/ld used to bind reusable subterms.
const CLIPS = {
  "nusantara-atlas": `st(1, N/${FPS})` /* t */,
  // rings from center-right (asymmetric), two sine trains + horizontal scan band
  "nusantara-atlas": `st(1,N/${FPS});38*sin(hypot(X-${W * 0.62},Y-${H * 0.5})*0.045-6*ld(1))+24*sin(0.011*X+0.007*Y+1.5*ld(1))+50*exp(-1*pow(mod(X+${W}*ld(1),${W})-${W / 2},2)/140)+42`,

  // diagonal flowing interference
  teroka: `st(1,N/${FPS});30*sin(0.02*X+0.031*Y+5*ld(1))*cos(0.017*X-0.023*Y-3*ld(1))+14*sin(0.05*(X+Y)+8*ld(1))+46`,

  // quantized 30px cells, deterministic hash flicker every 6 frames + slow sweep
  ledgr: `st(1,floor(N/6));st(2,mod(abs(sin(floor(X/30)*12.9898+floor(Y/30)*78.233+ld(1)*37.719)*43758.5453),1));18+105*ld(2)*ld(2)+40*exp(-1*pow(mod(Y+N*3,120)-60,2)/300)`,

  // oscilloscope: trace follows a breath-modulated sine, glow via gaussian
  "aria-synth": `st(1,N/${FPS});st(2,${H / 2}+90*sin(0.045*X+6.5*ld(1))*(0.6+0.4*sin(2.4*ld(1))));12+200*exp(-1*pow(Y-ld(2),2)/30)+10*sin(0.06*X)*sin(0.05*Y+2*ld(1))`,
};

// tint grayscale toward #00F0FF: low red, strong green+blue lift
const TINT = "lutrgb=r='val*0.16+8':g='val*0.72+26':b='val*0.88+44'";

const results = [];
for (const [id, expr] of Object.entries(CLIPS)) {
  const graph = [
    `[0:v]format=gray,geq=lum='${expr}'`,
    `format=rgb24,${TINT}`,
    `vignette,noise=alls=3:allf=t`,
    `fade=t=in:st=0:d=0.4,fade=t=out:st=${D - 0.4}:d=0.4`,
    `format=yuv420p[v]`,
  ].join(",");

  const script = join(TMP, `preview-${id}.filter`);
  writeFileSync(script, graph);

  const out = join(OUT, `${id}.mp4`);
  const r = spawnSync(
    "ffmpeg",
    [
      "-y", "-hide_banner", "-loglevel", "error",
      "-f", "lavfi", "-i", `color=c=black:s=${W}x${H}:r=${FPS}:d=${D}`,
      "-/filter_complex", script,
      "-map", "[v]", "-an",
      "-c:v", "libx264", "-preset", "slower", "-crf", "32",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      out,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  if (r.status !== 0) {
    console.error(`FAIL ${id}:\n${r.stderr}`);
    process.exit(1);
  }
  console.log(`previews/${id}.mp4  ok`);
  results.push(out);
}
rmSync(TMP, { recursive: true, force: true });
console.log(`${results.length} preview clips written to public/previews/`);
