npm run build
aws s3 cp build s3://munstrography.com --recursive
aws s3 cp s3://munstrography.com/index.html s3://munstrography.com/index.html --metadata-directive REPLACE --cache-control max-age=0 --content-type "text/html"