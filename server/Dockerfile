FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production
ENV CLAUDE_KEY=""
ENV MONGODB_URI=""
ENV JWT_SECRET=""

EXPOSE 3000

CMD ["node", "index.js"]