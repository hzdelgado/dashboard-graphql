# Usa una imagen base oficial de Node.js
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

# Etapa de ejecución
FROM node:20-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY --from=builder /app ./

# Expone el puerto configurado
EXPOSE ${PORT}

# Antes de ejecutar npm start, imprime las variables de entorno
RUN echo "Starting app with the following environment variables:" \
    && echo "NEXT_PUBLIC_GRAPHQL_API=${NEXT_PUBLIC_GRAPHQL_API}" \
    && echo "PORT=${PORT}"

# Comando por defecto
CMD ["npm", "start"]