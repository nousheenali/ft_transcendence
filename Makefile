all: up

up:
	docker-compose -f docker-compose.yml up --build -d

down:
	docker-compose -f docker-compose.yml down 

clean: down
	docker stop $$(docker ps -qa); \
	docker rm $$(docker ps -qa); \
	docker rmi -f $$(docker images -qa); \
	docker volume rm $$(docker volume ls -q); \
	docker network rm $$(docker network ls -q);

fclean: clean
	sudo docker system prune --volumes --all --force

