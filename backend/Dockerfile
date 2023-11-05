FROM node:lts
RUN apt-get update  &&  npm i -g @nestjs/cli && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "run", "start:dev"]