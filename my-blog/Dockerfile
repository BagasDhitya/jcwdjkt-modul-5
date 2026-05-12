# Base image: menentukan image menggunakan node version berapa
FROM node:20-alpine

# Working directory di dalam container
WORKDIR /app

# Copy package files dulu
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Build Typescript
RUN npm run build

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi di mode production
CMD ["npm", "run", "start"]