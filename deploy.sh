#!/bin/bash
set -euo pipefail

npm run build

BUCKET="munstrography.com"
GALLERY="img/gallery"

# Site assets (JS/CSS/HTML) should always refresh. Gallery photos are
# add-only, so skip any that already exist on S3.
aws s3 cp build "s3://${BUCKET}" --recursive --exclude "${GALLERY}/*"

existing=$(mktemp)
stage=$(mktemp -d)
trap 'rm -f "$existing"; rm -rf "$stage"' EXIT

aws s3api list-objects-v2 \
  --bucket "$BUCKET" \
  --prefix "${GALLERY}/" \
  --query 'Contents[].Key' \
  --output text | tr '\t' '\n' | grep -v '^None$' | grep -v '^$' > "$existing" || true

while IFS= read -r -d '' file; do
  rel="${file#build/}"
  if grep -Fxq "$rel" "$existing"; then
    continue
  fi
  mkdir -p "$stage/$(dirname "$rel")"
  cp "$file" "$stage/$rel"
done < <(find "build/${GALLERY}" -type f ! -name '.DS_Store' -print0)

uploaded=$(find "$stage" -type f | wc -l | tr -d ' ')
local_count=$(find "build/${GALLERY}" -type f ! -name '.DS_Store' | wc -l | tr -d ' ')
skipped=$((local_count - uploaded))

if [ "$uploaded" -gt 0 ]; then
  aws s3 cp "$stage/${GALLERY}" "s3://${BUCKET}/${GALLERY}" --recursive
fi

echo "Gallery: uploaded ${uploaded} new photo(s), skipped ${skipped} already on S3"

aws s3 cp "s3://${BUCKET}/index.html" "s3://${BUCKET}/index.html" \
  --metadata-directive REPLACE --cache-control max-age=0 --content-type "text/html"
