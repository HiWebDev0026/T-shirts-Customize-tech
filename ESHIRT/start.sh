docker-compose up -d database
sleep 3
docker-compose up -d api
docker-compose up -d client
docker-compose up