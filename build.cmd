docker build -t coda-hub-api:latest .
docker run --rm -d -p 8080:8080 --network bridge coda-hub-api:latest