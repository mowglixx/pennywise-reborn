FROM node:26.10.0-alpine3.24 AS install

# needed to prevent leaking in console
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci

FROM install as build
COPY --from=install /app/node_modules /app/node_modules
COPY ./src /app/src

FROM build as prod

USER node
EXPOSE 9000

CMD [ "npm", "start" ]