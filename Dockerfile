FROM node:16

ENV PM2_HOME="/home/node/app/.pm2"

WORKDIR /usr/src/app

COPY ./ ./

# Install node modules and build
RUN npm install -g node-pre-gyp
RUN npm ci --production
RUN npm audit
RUN npm run build
RUN npm rebuild @tensorflow/tfjs-node build-addon-from-source

# Make build footprint version for easier debugging.
RUN rm ./version.txt
RUN openssl rand -hex 12 > version.txt

# Install local packages for running server.
RUN npm install dotenv
RUN npm install pm2 -g

# Make app run on lower priviledge user for openshift.
USER root
RUN chmod -R 775 /usr/src/app/dist
RUN chown -R 1000:root /usr/src/app/dist
USER 1000

EXPOSE 8080
CMD ["pm2-runtime","dist/server.js"]