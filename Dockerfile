FROM gcr.io/easymetrics-gpc/docker-node10-lts:latest

ENV APP_ENV production

# Set environment variables
RUN mkdir -p /var/www/app/current/nest-seed
ENV appDir /var/www/app/current

COPY package.json /var/www/app/current

WORKDIR ${appDir}
RUN npm i --production

# Copy production build files
# ...
COPY ./dist /var/www/app/current/nest-seed

# PM2 Configuration
# ...
COPY ./process.yml /var/www/app/current

# DotEnv Configuration
# ...
# COPY ./.env /var/www/app/current/.env

# ENV KEYMETRICS_SECRET <secret>
# ENV KEYMETRICS_PUBLIC <public_key>
# ENV INSTANCE_NAME "nest-seed"

#Expose the ports ( Nest http2/s, socket.io, keymetrics )
EXPOSE 4433 43554 80

CMD ["pm2-docker", "start", "--auto-exit", "--env", "production", "process.yml"]
