FROM node:14.17
WORKDIR /app
EXPOSE 2303
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY ./build/index.js .
CMD [ "node", "index.js" ]