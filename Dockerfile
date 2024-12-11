FROM node:20-alpine3.20
WORKDIR /app
COPY package.json ./
RUN npm install --registry https://registry.npmmirror.com/  --legacy-peer-deps
COPY . .
RUN npm run build
CMD ["node", "./node_modules/next/dist/bin/next", "start"]