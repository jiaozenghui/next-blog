FROM node:20-alpine3.20
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "./node_modules/next/dist/bin/next", "start"]