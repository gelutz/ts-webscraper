FROM node:12.18.2-alpine

# Env
ENV TIME_ZONE=America/Sao_Paulo
ENV ENV_NAME dev
ENV EGG_SERVER_ENV dev
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev

# # Set the timezone in docker
# RUN apk --update add tzdata \\
#    && cp /usr/share/zoneinfo/Asia/Hong_Kong /etc/localtime \\
#    && echo "Asia/Hong_Kong" > /etc/timezone \\
#    && apk del tzdata


WORKDIR /app
COPY package.json .

# Yarn comes preinstalled with node
ADD . /app
RUN yarn install
RUN yarn tsc

# Start
CMD [ "yarn", "start"]
EXPOSE 7001