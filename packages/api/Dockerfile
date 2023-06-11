FROM node:18

WORKDIR /usr/src/app

COPY package.json .

RUN yarn
RUN npm install -g typescript

COPY . .

RUN yarn build

EXPOSE 4000

CMD [ "yarn", "start" ]