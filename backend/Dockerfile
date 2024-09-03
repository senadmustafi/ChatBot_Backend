FROM node:lts

WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./
RUN npm ci --only=production --quiet

COPY ./prisma /app/prisma
COPY ./src /app/src

RUN npm run generate

EXPOSE 3030

CMD ["node", "src/index.js"]
