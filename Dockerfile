FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
CMD ["node", "./node_modules/next/dist/bin/next", "start"]