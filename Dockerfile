# Use same node version than used in staging
FROM node:18.20.4

WORKDIR /app

COPY package*.json ./

# Install npm dependencies
RUN npm install --silent
RUN npm install --save-dev typescript --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]