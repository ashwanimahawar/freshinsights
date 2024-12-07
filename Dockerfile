FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY ./server/package.json ./
RUN npm install
RUN npm install -g typescript 
COPY ./server .
RUN npm run build

FROM node:lts-alpine AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 5000

CMD ["node", "dist/index.js"]
