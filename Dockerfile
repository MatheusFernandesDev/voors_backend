FROM node:18.19.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build  

EXPOSE 5001

# Rodar migrations antes de iniciar a aplicação
CMD ["sh", "-c", "npm run migrate:run && npm start"]