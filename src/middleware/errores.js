// Cualquier petición que no coincida con ningún router.
function noEncontrado(req, res) {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl
  });
}

// Errores no controlados de cualquier ruta.
function errorInterno(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    error: 'Error interno del servidor'
  });
}

module.exports = { noEncontrado, errorInterno };