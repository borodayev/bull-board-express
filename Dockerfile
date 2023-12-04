FROM --platform=linux/amd64 node:20 AS builder

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# set app basepath
ENV HOME /home/node

# change workgin dir
WORKDIR $HOME/app/

# copy package.json files
COPY package*.json ./

# install deps in quiet mode
RUN npm ci -q

# copy all app files
COPY . $HOME/app/

# compile typescript and build all production stuff
RUN npm run build

# remove dev dependencies that are not needed in production
RUN npm prune --production

FROM --platform=linux/amd64 node:20

# run app with low permissions level user
USER node

# set app basepath
ENV HOME /home/node

# change working dir
WORKDIR $HOME/app/

# copy production complied node app to the new image
COPY --chown=node:node --from=builder $HOME/app/dist/ .
COPY --chown=node:node --from=builder $HOME/app/package.json .
COPY --chown=node:node --from=builder $HOME/app/tsconfig*.json .
COPY --chown=node:node --from=builder $HOME/app/node_modules ./node_modules

ENV HTTP_PORT 8090

EXPOSE ${HTTP_PORT}

CMD ["node", "./index.js"]
