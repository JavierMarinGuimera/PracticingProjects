import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const outDir = path.join(root, "out");

if (!existsSync(publicDir)) {
  console.log("No public directory found. Skipping public asset copy.");
  process.exit(0);
}

await mkdir(outDir, { recursive: true });
await cp(publicDir, outDir, {
  recursive: true,
  force: true,
});

console.log("Copied public assets into out/.");
