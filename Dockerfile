FROM node:14

WORKDIR /netflix-cln-app
COPY package.json .
RUN npm install
COPY . .
CMD npm start
