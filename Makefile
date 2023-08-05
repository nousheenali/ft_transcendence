FILE			= ./docker-compose.yml
DOCKER_CMD		= docker compose -f ${FILE}

# NGINX_CNTNR		= nginx
# MARIA_CNTNR		= mariadb
# WRDPR_CNTNR		= wordpress

# NGINX_IMAGE		= nginx:custom
# MARIA_IMAGE		= mariadb:custom
# WRDPR_IMAGE		= wordpress:custom

# NETWORK			= custom
# WP_VOLUME 		= wordpress_data
# DB_VOLUME 		= mariadb_data

# VOLUME_DIR 		= /home/apila-va/data
# WP_VOLUME_DIR	= ${VOLUME_DIR}/wordpress
# DB_VOLUME_DIR	= ${VOLUME_DIR}/database

all: build up

build:
	${DOCKER_CMD} build

up:
	${DOCKER_CMD} up

down:
	${DOCKER_CMD} down

# create_volumes:
# 	sudo mkdir -p ${WP_VOLUME_DIR} ${DB_VOLUME_DIR}

# goin_nginx:
# 	docker exec -it ${NGINX_CNTNR} /bin/bash # -it = interactive mode

# goin_mariadb:
# 	docker exec -it ${MARIA_CNTNR} /bin/bash

# goin_wordpress:
# 	docker exec -it ${WRDPR_CNTNR} /bin/bash

# clean:
# 	docker rm -f ${NGINX_CNTNR} ${MARIA_CNTNR} ${WRDPR_CNTNR}
# 	docker rmi -f ${NGINX_IMAGE} ${MARIA_IMAGE} ${WRDPR_IMAGE}
# 	sudo rm -rf ${WP_VOLUME_DIR}/* ${DB_VOLUME_DIR}/*
# 	sudo docker volume rm -f ${WP_VOLUME} ${DB_VOLUME}
# 	if docker network inspect ${NETWORK} > /dev/null; then \
#         docker network rm ${NETWORK}; \
#     fi

# re: clean all