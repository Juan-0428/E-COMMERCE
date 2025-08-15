# Usa imagen oficial de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm ci --only=production

# Copia el resto del código
COPY . .

# Compila TypeScript
RUN npm run build

# Puerto expuesto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start:prod"]