FROM node:latest
WORKDIR /webapp
COPY package.json /webapp/package.json
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
