FROM node:8-alpine

USER nobody

# specify the working directory
WORKDIR app

# expose server and debug port
EXPOSE 8080 5858

# run application
CMD ["node", "dist/src/index.js"]
