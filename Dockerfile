FROM node:21-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY .npmrc ./
COPY src ./src
COPY tools ./tools
# if somehow we don't get npm latest version with node:21-alpine3.18, we are installing npm@latest for safe side 
RUN npm install -g npm@latest
# Specifically intended for continuous integration (CI) environments or cases 
# where you need a clean install with consistent dependency versions.
RUN npm ci && npm run build

# Without the builder stage: If you run npm ci && npm run build directly in the final image, 
# all development dependencies (such as TypeScript, testing libraries, etc.) and the build 
# tools will be included in the final Docker image. This results in a larger image, 
# which can be slower to pull, push, and deploy.

# multi-stage build benifit summary
# Smaller image
# Faster builds
# More secure

FROM node:21-alpine3.18

WORKDIR /app
# we will use curl service health check
RUN apk add --no-cache curl
COPY package*.json ./
COPY tsconfig.json ./
COPY .npmrc ./
RUN npm install -g pm2 npm@latest
RUN npm ci --production
COPY --from=builder /app/build ./build

EXPOSE 4001

CMD [ "npm", "run", "start" ]
