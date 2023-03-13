FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json .

COPY --chown=node:node package-lock.json .

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "npm", "start" ]

