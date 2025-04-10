# FROM node:18

# WORKDIR /app
# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npx prisma generate

# EXPOSE 5000
# CMD ["node", "server.js"]


FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

# ✅ Copy your SQLite database
COPY ./prisma/macdash.db ./prisma/macdash.db

EXPOSE 5000
CMD ["node", "server.js"]
