#!/usr/bin/env node

import * as fs from "node:fs";
import { buffer } from "node:stream/consumers";

import ExifTransformer from "exif-be-gone";
import { globSync } from "glob";

let args = process.argv.slice(2);
if (args.length === 0) {
  args = globSync("source/assets/**/*.{png,jpg,jpeg,webp}");
}
for (const path of args) {
  const reader = fs.createReadStream(path);
  const result = await buffer(reader.pipe(new ExifTransformer()));
  fs.writeFileSync(path, result);
}
