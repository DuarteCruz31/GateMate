rm -rf data
cd database_adaptor
rm -rf venv
cd ..
cd live_data_consumer
rm -rf venv
cd ..
cd notification_manager
rm -rf venv

docker-compose down
docker rm $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker-compose up -d --build
open http://localhost:8083/ 