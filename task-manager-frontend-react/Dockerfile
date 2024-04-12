FROM node:20.11.0 AS base
LABEL authors="jefersonkrauss"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS development
EXPOSE 3000
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]

FROM base AS production
RUN npm run build
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]

