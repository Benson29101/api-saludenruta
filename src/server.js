const express = require('express');
const establecimientosRoutes = require('./routes/establecimientos');
const serviciosRoutes = require('./routes/servicios');
const { noEncontrado, errorInterno } = require('./middleware/errores');

const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta de salud
app.get('/', (req, res) => {
  res.json({ mensaje: 'SaludEnRuta API funcionando' });
});

// Routers
app.use('/api/establecimientos', establecimientosRoutes);
app.use('/api/servicios', serviciosRoutes);

// Errores 
app.use(noEncontrado);
app.use(errorInterno);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});