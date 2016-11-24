FROM mhart/alpine-node:6.9.1

MAINTAINER Talento90

# create a specific user to run this container
RUN adduser -S -D user-app

# add files to container
ADD . /app

# specify the working directory
WORKDIR app

RUN chmod -R 777 .

# build process
RUN npm install
RUN npm run build
RUN npm prune --production

# run the container using a specific user
USER user-app

EXPOSE 8080

# run application
CMD ["npm", "start"]