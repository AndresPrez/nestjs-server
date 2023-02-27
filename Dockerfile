# Inspired from https://dev.to/erezhod/setting-up-a-nestjs-project-with-docker-for-back-end-development-30lg
FROM ubuntu:latest AS app-dev

# Installs Curl
RUN apt-get -y update && apt-get -y install curl

# Installs Nodejs 19.x
RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_19.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install nodejs
RUN npm install -g yarn
RUN node -v

# Install psql client
RUN apt install -y postgresql-client

WORKDIR /usr/src/app

RUN npm install glob rimraf

COPY . .

RUN yarn install && yarn build

FROM ubuntu:latest as app-prod

# Installs Curl
RUN apt-get -y update && apt-get -y install curl

# Installs Nodejs 19.x
RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_19.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install nodejs
RUN npm install -g yarn
RUN node -v

# Install psql client
RUN apt install -y postgresql-client

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=app-dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
