# Base image: menentukan image menggunakan node version berapa
FROM node:20-alpine

# Working directory di dalam container
WORKDIR /app

# Copy package files dulu
COPY package*.json ./

# Tambahkan file prisma
COPY prisma ./prisma/ 

# Install dependencies
RUN npm install

# Generate prisma di dalam docker
RUN npx prisma generate

# Copy seluruh source code
COPY . .

# Build Typescript
RUN npm run build

# Expose port aplikasi
EXPOSE 8000

# Jalankan aplikasi di mode production
CMD ["npm", "run", "start"]