ARG firefox_profile_path="prof"
FROM node:18-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
# USER node
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    firefox \
    timg
 #   chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/firefox
 ENV FIREFOX_PATH_LOCAL=$firefox_profile_path
RUN npm install

RUN  npx puppeteer browsers install firefox
COPY --chown=node:node . .