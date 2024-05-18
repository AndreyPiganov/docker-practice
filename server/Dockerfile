FROM node:lts-alpine as builder

WORKDIR /app

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
