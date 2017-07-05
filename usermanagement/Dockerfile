FROM node:latest
RUN mkdir /usermanagement
WORKDIR /usermanagement
COPY package.json /usermanagement
RUN npm install

ENV MONGODB_URL localhost
ENV MONDODB_PORT 27017
ENV PORT 8002

EXPOSE 8002
CMD ["npm", "start"]
