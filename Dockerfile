FROM node:latest

WORKDIR ./project/js


COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
ENTRYPOINT ["node", "index.js"]