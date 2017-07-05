FROM node:latest
RUN mkdir /webapp
WORKDIR /webapp
COPY package.json /webapp
RUN npm install

ENV MONGODB_URL localhost
ENV MONDODB_PORT 27017
ENV PORT 3000

EXPOSE 3000
CMD ["npm", "start"]
