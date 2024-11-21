# Etapa de construcción
FROM node:18-slim AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# Instala dependencias y construye la aplicación
RUN npm install
RUN npm run build

# Etapa de ejecución
FROM node:20-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instala solo dependencias de producción
RUN npm install --production

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "start"]
