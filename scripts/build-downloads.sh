#!/bin/sh
# Rebuild downloads/: one zip per skill, plus one zip with all skills.
# Run from the repo root after changing any skill: sh scripts/build-downloads.sh
set -e
cd "$(dirname "$0")/.."
rm -rf downloads && mkdir downloads
skills=$(for d in */; do if [ -f "$d/SKILL.md" ]; then echo "${d%/}"; fi; done)
for s in $skills; do
  zip -qr -X "downloads/$s.zip" "$s" -x '*.DS_Store'
done
zip -qr -X downloads/readyteam-all-skills.zip $skills -x '*.DS_Store'
ls downloads
