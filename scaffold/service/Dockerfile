FROM node:10.16.3-alpine as build

# Arguments
ARG NPM_TOKEN
ARG NODE_ENV

RUN apk --no-cache add \
      bash \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      python

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash

# Create app directory
ENV APP_DIR=/usr/src/api-medical-consultation
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR


# Install app dependencies
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
COPY package.json $APP_DIR
RUN yarn install --prod

# Setup configs and build dependencies
COPY . .

# Bundle app source
RUN yarn build

# Production container
FROM node:10.16.3-alpine

# Create app directory
ENV APP_DIR=/usr/src/api-medical-consultation \
    NODE_ENV=$NODE_ENV
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY --from=build $APP_DIR/lib $APP_DIR/lib
COPY --from=build $APP_DIR/node_modules $APP_DIR/node_modules
COPY --from=build $APP_DIR/config $APP_DIR/config
COPY --from=build $APP_DIR/package.json $APP_DIR/package.json
COPY --from=build $APP_DIR/yarn.lock $APP_DIR/yarn.lock
COPY --from=build $APP_DIR/.env $APP_DIR/.env

EXPOSE {{{scaffold_service_port}}}
CMD ["yarn", "start"]
