FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN npm install -g typescript

RUN yarn build

EXPOSE 9000

CMD [ "yarn", "start" ]