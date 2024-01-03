const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos generados por Vite React
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta para manejar todas las demás solicitudes y redirigirlas al archivo index.html generado por Vite
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});