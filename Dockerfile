# Usa una imagen base oficial de Node.js
FROM node:18-slim AS builder

# Definir el argumento en el Dockerfile
ARG NEXT_PUBLIC_GRAPHQL_API
ARG PORT

# Usar el valor del argumento durante el build
ENV NEXT_PUBLIC_GRAPHQL_API=$NEXT_PUBLIC_GRAPHQL_API
ENV PORT=$PORT

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

# Define los mismos ARG en la segunda etapa si es necesario
ARG NEXT_PUBLIC_GRAPHQL_API
ARG PORT

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY --from=builder /app ./

# Establece las variables de entorno de ejecución
ENV NEXT_PUBLIC_GRAPHQL_API=$NEXT_PUBLIC_GRAPHQL_API
ENV PORT=$PORT

# Expone el puerto configurado
EXPOSE $PORT

# Antes de ejecutar npm start, imprime las variables de entorno
RUN echo "Starting app with the following environment variables:" \
    && echo "NEXT_PUBLIC_GRAPHQL_API=${NEXT_PUBLIC_GRAPHQL_API}" \
    && echo "PORT=${PORT}"

# Comando por defecto
CMD ["npm", "start"]