# Usa la imagen base de Node.js
FROM node:16.15.0-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install --production

# Copia la carpeta de distribución de Vite React (asegúrate de que ya has generado la carpeta de distribución antes de construir la imagen del contenedor)
COPY dist ./

# Instala Express globalmente
RUN npm install -g express

# Expone el puerto en el que se ejecutará el servidor Express
EXPOSE 3000

# Comando para iniciar el servidor Express
CMD ["node", "server.js"]