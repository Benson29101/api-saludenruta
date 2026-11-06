const bd = require('../data/bd');

// GET lista. /api/servicios
function listar(req, res) {
  res.json({ total: bd.servicios.length, servicios: bd.servicios });
}

// GET detalle. /api/servicios/:id 
function detalle(req, res) {
  const id = Number(req.params.id);
  const s = bd.servicios.find(x => x.id === id);
  if (!s) {
    return res.status(404).json({ error: 'Servicio no encontrado', id });
  }
  res.json(s);
}

// GET establecimientos que ofrecen ese servicio. /api/servicios/:id/establecimientos
function establecimientosPorServicio(req, res) {
  const id = Number(req.params.id);
  const servicio = bd.servicios.find(s => s.id === id);
  if (!servicio) {
    return res.status(404).json({ error: 'Servicio no encontrado', id });
  }

  const establecimientos = bd.establecimientos
    .filter(e => e.servicios.some(s => s.servicio_id === id))
    .map(e => ({
      id: e.id,
      nombre: e.nombre,
      provincia: e.provincia,
      municipio: e.municipio,
      telefono: e.telefono,
      disponibilidad: e.servicios.find(s => s.servicio_id === id).disponibilidad
    }));

  res.json({
    servicio: servicio.nombre,
    total: establecimientos.length,
    establecimientos
  });
}

module.exports = { listar, detalle, establecimientosPorServicio };