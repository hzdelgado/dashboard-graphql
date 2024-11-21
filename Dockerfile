# Usa la imagen base oficial de Node.js
FROM node:18-slim AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# Instala dependencias
RUN npm install

# Compila la aplicación
RUN npm run build

# Usa una imagen más ligera para producción
FROM node:20-alpine AS runner

WORKDIR /app

# Copia los archivos de la build
COPY --from=builder /app ./

# Expone el puerto en el que se ejecutará Next.js
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
