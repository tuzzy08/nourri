
FROM node:20-alpine as builder

ENV NODE_ENV build

# USER node
WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build \
    && npm prune --omit=dev



# ---

FROM node:20-alpine

ENV NODE_ENV production

# USER node
WORKDIR /api

COPY --from=builder  /api/package*.json ./
COPY --from=builder  /api/node_modules/ ./node_modules/
COPY --from=builder  /api/dist/ ./dist/

CMD ["node", "dist/src/main.js"]