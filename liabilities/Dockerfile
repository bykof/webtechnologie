FROM node:latest
RUN mkdir /liabilities
WORKDIR /liabilities
COPY package.json /liabilities
RUN npm install

ENV MONGODB_URL localhost
ENV MONDODB_PORT 27017
ENV PORT 8001

EXPOSE 8001
CMD ["npm", "start"]
