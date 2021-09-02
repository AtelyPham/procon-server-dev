FROM node:14.17
WORKDIR /app
EXPOSE 2303
COPY package*.json /app
COPY yarn.lock /app
RUN yarn install
COPY . /app
CMD ["yarn", "dev"]