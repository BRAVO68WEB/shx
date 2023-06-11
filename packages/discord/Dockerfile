FROM node:18

LABEL maintainer="Jyotirmoy Bandyopadhayaya <hi@b68.dev>";  
LABEL version="1.2.0"

WORKDIR /app

RUN apt update -y

RUN apt install python3

COPY package.json .
COPY tsconfig.json .

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]