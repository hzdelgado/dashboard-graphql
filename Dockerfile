# Usa la imagen base oficial de Node.js
FROM node:18-slim AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY . .

# Instala dependencias
RUN npm install

# Argumento para variables inyectadas en el build
ARG NEXT_PUBLIC_GRAPHQL_API

# Compila la aplicación usando las variables de entorno inyectadas
ENV NEXT_PUBLIC_GRAPHQL_API=$NEXT_PUBLIC_GRAPHQL_API
RUN npm run build

# Etapa de ejecución
FROM node:20-alpine AS runner

WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instala solo dependencias de producción
RUN npm ci --only=production

# Configura las variables de entorno para la ejecución del contenedor
ENV NEXT_PUBLIC_GRAPHQL_API=$NEXT_PUBLIC_GRAPHQL_API

# Expone el puerto
EXPOSE 3000

RUN echo "Building with NEXT_PUBLIC_GRAPHQL_API=$NEXT_PUBLIC_GRAPHQL_API"

# Comando por defecto
CMD ["npm", "start"]
