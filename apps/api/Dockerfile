# 1
FROM node:20-alpine as builder
# 2
ENV NODE_ENV build
# 3
WORKDIR /api
# 4
COPY package*.json ./
# 5
RUN npm install
# 6
COPY . .
# 7
RUN npm run build \
    && npm prune --production

# 8
FROM node:20-alpine
# 9
ENV NODE_ENV production
# 10
WORKDIR /api
# 11
COPY --from=builder  /api/package*.json ./
COPY --from=builder  /api/node_modules/ ./node_modules/
COPY --from=builder  /api/dist/ ./dist/
# 12
CMD ["node", "dist/src/main.js"]