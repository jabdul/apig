FROM node:10.14.1-alpine

ARG NPM_TOKEN
ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}
ENV APP_DIR=/usr/src/api

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY package.json $APP_DIR
COPY .babelrc $APP_DIR

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
RUN yarn install

COPY src $APP_DIR/src
COPY config $APP_DIR/config

RUN yarn build

RUN rm -f ~/.npmrc

CMD ["yarn", "start"]
