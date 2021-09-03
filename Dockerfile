FROM node:14.17
WORKDIR /app
EXPOSE 2303
COPY . .
RUN yarn install --production
CMD [ "node", "index.js" ]