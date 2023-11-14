FROM node:16
RUN npm install -g @nestjs/cli
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD npm run migrate && npm run start:dev
