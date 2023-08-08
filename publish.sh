rm -r -f ./dist
npm ci
npm audit
npm run build
docker build -t coda-hub-api:latest .

docker tag coda-hub-api:latest coda19/coda19-hub-api:latest
docker push coda19/coda19-hub-api:latest
echo "Finished running script sleeping 30s"
sleep 30