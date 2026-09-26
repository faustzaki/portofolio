/**
 * Hand-rolled minimal GLB writer (no deps, node:05) + procedural showcase meshes.
 * Emits public/models/mesh-wave.glb and public/models/particles.glb
 * for the M3 WebGL scene. Aesthetic targets are noded in M2.5 kanban body:
 * cyan wire wave (Lusion-style) + deep-space cyan particles.
 * ponytail: single-buffer GLB, one material per mesh — upgrade to shared
 * glTF binary when a scene graph is needed (M3 imports them separately anyway).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "models");
mkdirSync(OUT_DIR, { recursive: true });

class Writer {
  constructor() { this.chunks = []; this.length = 0; }
  bytes(b) { this.chunks.push(b); this.length += b.length; }
  _reserve(n) { const b = Buffer.alloc(n); this.bytes(b); return b; }
  u32(v) { this._reserve(4).writeUInt32LE(v >>> 0, 0); }
  f32(v) { this._reserve(4).writeFloatLE(v, 0); }
  f32s(arr) { const b = this._reserve(arr.length * 4); for (let i = 0; i < arr.length; i++) b.writeFloatLE(arr[i], i * 4); }
  u32s(arr) { const b = this._reserve(arr.length * 4); for (let i = 0; i < arr.length; i++) b.writeUInt32LE(arr[i] >>> 0, i * 4); }
  toBuffer() { return Buffer.concat(this.chunks, this.length); }
}

/**
 * Subdivided plane in XZ (y = 0). Grid of (n+1)^2 vertices.
 * Mirrors the classic "mesh wave" aesthetic: two cross-traveling sine trains,
 * frozen at t=0 — the M3 shader drives amplitude/phase live.
 */
function wavePlane({ size = 2.6, n = 112, a1 = 0.16, k1 = 3.1, a2 = 0.09, k2 = 2.0, phase = 0.8 }) {
  const W = new Writer();
  const idx = new Writer();
  const pos = [], norm = [], uvs = [];
  const half = size / 2;
  for (let j = 0; j <= n; j++) {
    for (let i = 0; i <= n; i++) {
      const x = -half + (size * i) / n;
      const z = -half + (size * j) / n;
      const y = a1 * Math.sin(k1 * x + phase) * Math.cos(k1 * z * 0.6)
              + a2 * Math.sin(k2 * (x + z) + phase * 1.7);
      pos.push(x, y, z);
      // analytic-ish normal from partial derivatives (two-term wave)
      const dx = a1 * k1 * Math.cos(k1 * x + phase) * Math.cos(k1 * z * 0.6)
               + a2 * k2 * Math.cos(k2 * (x + z) + phase * 1.7);
      const dz = -a1 * k1 * 0.6 * Math.sin(k1 * x + phase) * Math.sin(k1 * z * 0.6)
               + a2 * k2 * Math.cos(k2 * (x + z) + phase * 1.7);
      const len = Math.hypot(dx, 1, dz);
      norm.push(-dx / len, 1 / len, -dz / len);
      uvs.push(i / n, j / n);
    }
  }
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const a = j * (n + 1) + i, b = a + 1, c = a + n + 1, d = c + 1;
      idx.u32s([a, c, b, b, c, d]);
    }
  }
  W.f32s(pos); const posOff = 0;
  W.f32s(norm); const normOff = pos.length * 4;
  W.f32s(uvs); const uvOff = normOff + norm.length * 4;
  return { writer: W, indexWriter: idx, pos, norm, uvCount: uvs.length / 2,
           posOff, normOff, uvOff, vertCount: (n + 1) * (n + 1) };
}

/** Deep-space particle scatter: 12k points in a flat ellipsoid shell. */
function particleField({ count = 12000, rx = 1.7, ry = 0.55, rz = 1.0 }) {
  const W = new Writer();
  const pos = new Array(count * 3);
  // deterministic PRNG so rebuilds are byte-stable
  let seed = 0x9e3779b9;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0xffffffff; };
  for (let i = 0; i < count; i++) {
    // shell bias: sample cube, normalize, jitter radius 0.85..1.05
    let x = rnd() * 2 - 1, y = rnd() * 2 - 1, z = rnd() * 2 - 1;
    const l = Math.hypot(x, y, z) || 1;
    const r = 0.85 + rnd() * 0.2;
    pos[i * 3] = (x / l) * rx * r;
    pos[i * 3 + 1] = (y / l) * ry * r;
    pos[i * 3 + 2] = (z / l) * rz * r;
  }
  W.f32s(pos);
  return { writer: W, count };
}

function pad4(n) { return (4 - (n % 4)) % 4; }

function buildGLB({ json, bin }) {
  const enc = Buffer.from(JSON.stringify(json), "utf8");
  const jsonPad = pad4(enc.length);
  const jsonChunk = Buffer.concat([enc, Buffer.alloc(jsonPad, 0x20)]);
  const binPad = pad4(bin.length);
  const binChunk = Buffer.concat([bin, Buffer.alloc(binPad)]);
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0); // magic "glTF"
  header.writeUInt32LE(2, 4);          // version
  header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + binChunk.length, 8);
  const jc = Buffer.alloc(8); jc.writeUInt32LE(jsonChunk.length, 0); jc.writeUInt32LE(0x4e4f534a, 4);
  const bc = Buffer.alloc(8); bc.writeUInt32LE(binChunk.length, 0); bc.writeUInt32LE(0x004e4942, 4);
  return Buffer.concat([header, jc, jsonChunk, bc, binChunk]);
}

function emitMesh(name, { writer, indexWriter, pos, norm, uvCount, posOff, normOff, uvOff, vertCount }) {
  let bin = writer.toBuffer();
  const byLen = (n) => n * 4;
  const accessors = [
    { bufferView: 0, componentType: 5126, count: vertCount, type: "VEC3", min: [-1.3, -0.3, -1.3], max: [1.3, 0.3, 1.3] },
    { bufferView: 1, componentType: 5126, count: vertCount, type: "VEC3" },
    { bufferView: 2, componentType: 5126, count: uvCount, type: "VEC2" },
  ];
  const bufferViews = [
    { buffer: 0, byteOffset: posOff, byteLength: byLen(pos.length) },
    { buffer: 0, byteOffset: normOff, byteLength: byLen(norm.length) },
    { buffer: 0, byteOffset: uvOff, byteLength: byLen(uvCount * 2) },
  ];
  let primitives, indicesBufLen = 0;
  if (indexWriter) {
    const idxBuf = indexWriter.toBuffer();
    const full = Buffer.concat([bin, idxBuf]);
    const idxOff = bin.length;
    bin = full;
    indicesBufLen = idxBuf.length;
    bufferViews.push({ buffer: 0, byteOffset: idxOff, byteLength: indicesBufLen });
    accessors.push({ bufferView: 3, componentType: 5125, count: indicesBufLen / 4, type: "SCALAR" });
    primitives = [{ attributes: { POSITION: 0, NORMAL: 1, TEXCOORD_0: 2 }, indices: 3, mode: 4, material: 0 }];
  } else {
    primitives = [{ attributes: { POSITION: 0 }, mode: 0, material: 0 }];
  }
  const json = {
    asset: { version: "2.0", generator: "hybrid-showcase procedural (M2.5)" },
    scene: 0, scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name }],
    meshes: [{ name, primitives }],
    materials: [{
      name: `${name}-mat`,
      pbrMetallicRoughness: { baseColorFactor: [0.0, 0.94, 1.0, 1.0], metallicFactor: 0.35, roughnessFactor: 0.25 },
      emissiveFactor: [0.0, 0.35, 0.4],
    }],
    accessors, bufferViews,
    buffers: [{ byteLength: bin.length }],
  };
  const glb = buildGLB({ json, bin });
  const file = join(OUT_DIR, `${name}.glb`);
  writeFileSync(file, glb);
  return { file, bytes: glb.length };
}

// ---- emit both ----
const wave = wavePlane({});
const waveResult = emitMesh("mesh-wave", wave);
const parts = particleField({});
const partBin = parts.writer.toBuffer();
const partJson = {
  asset: { version: "2.0", generator: "hybrid-showcase procedural (M2.5)" },
  scene: 0, scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "particles" }],
  meshes: [{ name: "particles", primitives: [{ attributes: { POSITION: 0 }, mode: 0, material: 0 }] }],
  materials: [{ name: "particle-mat", pbrMetallicRoughness: { baseColorFactor: [0, 0.94, 1, 1], metallicFactor: 0, roughnessFactor: 1 } }],
  accessors: [{ bufferView: 0, componentType: 5126, count: parts.count, type: "VEC3", min: [-1.9, -0.6, -1.1], max: [1.9, 0.6, 1.1] }],
  bufferViews: [{ buffer: 0, byteLength: partBin.length }],
  buffers: [{ byteLength: partBin.length }],
};
const partGlb = buildGLB({ json: partJson, bin: partBin });
const partFile = join(OUT_DIR, "particles.glb");
writeFileSync(partFile, partGlb);

console.log(`mesh-wave.glb  ${(waveResult.bytes / 1024).toFixed(1)} KB`);
console.log(`particles.glb  ${(partGlb.length / 1024).toFixed(1)} KB`);
