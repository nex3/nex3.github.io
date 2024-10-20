#!/bin/sh -s

paths=$(
  git diff-index HEAD --name-only | grep '\.\(png\|jpe?g\|webp\)'
)

if [ -z "$paths" ]; then
  exit 0
fi

node tool/scrub-exif.js $paths

git add $paths
