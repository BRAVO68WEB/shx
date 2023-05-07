FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn
RUN npm install -g typescript

RUN yarn build

COPY . .

EXPOSE 9000

CMD [ "yarn", "start" ]