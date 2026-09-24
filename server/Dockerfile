ARG NODE_VERSION=26.10.0-alpine3.24

FROM node:${NODE_VERSION} AS dependencies

# needed to prevent leaking in console
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci

FROM node:${NODE_VERSION} as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY ./src /app/src

FROM builder as prod

USER node
EXPOSE 9000

CMD [ "npm", "start" ]