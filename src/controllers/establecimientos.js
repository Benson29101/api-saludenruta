const bd = require('../data/bd');

// GET lista con filtros (?provincia=, ?servicio=). /api/establecimientos
function listar(req, res) {
  let resultado = [...bd.establecimientos];

  if (req.query.provincia) {
    resultado = resultado.filter(e =>
      e.provincia.toLowerCase() === req.query.provincia.toLowerCase()
    );
  }

  if (req.query.servicio) {
    const servicio = bd.servicios.find(s =>
      s.nombre.toLowerCase() === req.query.servicio.toLowerCase() ||
      s.id === Number(req.query.servicio)
    );
    resultado = servicio
      ? resultado.filter(e => e.servicios.some(s => s.servicio_id === servicio.id))
      : [];
  }

  res.json({ total: resultado.length, establecimientos: resultado });
}

// GET a detalle. /api/establecimientos/:id
function obtener(req, res) {
  const id = Number(req.params.id);
  const est = bd.establecimientos.find(e => e.id === id);
  if (!est) {
    return res.status(404).json({ error: 'Establecimiento no encontrado', id });
  }
  res.json(est);
}

// POST /api/establecimientos 
function crear(req, res) {
  const nuevo = {
    id: bd.siguienteId(bd.establecimientos),
    ...req.body
  };
  bd.establecimientos.push(nuevo);
  res.status(201).json(nuevo);
}

// PATCH actualización parcial. /api/establecimientos/:id
function actualizar(req, res) {
  const id = Number(req.params.id);
  const index = bd.establecimientos.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Establecimiento no encontrado', id });
  }
  bd.establecimientos[index] = { ...bd.establecimientos[index], ...req.body, id };
  res.json(bd.establecimientos[index]);
}

// DELETE. /api/establecimientos/:id
function eliminar(req, res) {
  const id = Number(req.params.id);
  const index = bd.establecimientos.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Establecimiento no encontrado', id });
  }
  const eliminado = bd.establecimientos.splice(index, 1)[0];
  res.json({ mensaje: 'Establecimiento eliminado', establecimiento: eliminado });
}

module.exports = { listar, obtener, crear, actualizar, eliminar };