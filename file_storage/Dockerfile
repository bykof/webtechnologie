FROM node:latest
WORKDIR /file_storage
COPY package.json /file_storage
RUN npm install

ENV MONGODB_URL localhost
ENV MONDODB_PORT 27017
ENV PORT 8000

EXPOSE 8000
CMD ["npm", "start"]
