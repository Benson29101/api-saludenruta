const bd = require('../data/bd');

const CAMPOS_OBLIGATORIOS = [
  'nombre', 'tipo', 'provincia', 'municipio', 'direccion',
  'telefono', 'latitud', 'longitud', 'horarios', 'servicios'
];

// Formato HH:MM (00:00 a 23:59).
function esHoraValida(hora) {
  return typeof hora === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(hora);
}

// Valida los horarios de un establecimiento.
function validarHorarios(horarios) {
  if (!Array.isArray(horarios) || horarios.length === 0) {
    return ['El campo "horarios" debe ser un arreglo con al menos un horario.'];
  }

  const errores = [];
  horarios.forEach((h, i) => {
    if (!h.dia || !bd.diasValidos.includes(h.dia)) {
      errores.push(`horarios[${i}].dia debe ser uno de: ${bd.diasValidos.join(', ')}.`);
    }
    if (!esHoraValida(h.apertura)) {
      errores.push(`horarios[${i}].apertura inválida (formato HH:MM).`);
    }
    if (!esHoraValida(h.cierre)) {
      errores.push(`horarios[${i}].cierre inválido (formato HH:MM).`);
    }
    if (esHoraValida(h.apertura) && esHoraValida(h.cierre) && h.apertura >= h.cierre) {
      errores.push(`horarios[${i}]: "apertura" debe ser menor que "cierre".`);
    }
  });
  return errores;
}

// Valida los servicios asociados a un establecimiento.
function validarServiciosAsociados(servicios) {
  if (!Array.isArray(servicios) || servicios.length === 0) {
    return ['El campo "servicios" debe ser un arreglo con al menos un servicio.'];
  }

  const errores = [];
  servicios.forEach((s, i) => {
    if (!bd.servicios.some(srv => srv.id === s.servicio_id)) {
      errores.push(`servicios[${i}].servicio_id = ${s.servicio_id} no existe.`);
    }
    if (!bd.disponibilidadesValidas.includes(s.disponibilidad)) {
      errores.push(`servicios[${i}].disponibilidad debe ser: ${bd.disponibilidadesValidas.join(', ')}.`);
    }
    if (typeof s.requisitos !== 'string' || s.requisitos.trim() === '') {
      errores.push(`servicios[${i}].requisitos es obligatorio y debe ser texto.`);
    }
  });
  return errores;
}

// Valida los campos de un objeto y devuelve un arreglo de errores.
function validarCampos(body) {
  const errores = [];

  CAMPOS_OBLIGATORIOS.forEach(campo => {
    if (body[campo] === undefined || body[campo] === null || body[campo] === '') {
      errores.push(`El campo "${campo}" es obligatorio.`);
    }
  });

  if (body.nombre !== undefined && (typeof body.nombre !== 'string' || body.nombre.trim().length < 3)) {
    errores.push('El nombre debe tener al menos 3 caracteres.');
  }
  if (body.tipo !== undefined && !bd.tiposValidos.includes(body.tipo)) {
    errores.push(`El tipo debe ser uno de: ${bd.tiposValidos.join(', ')}.`);
  }
  if (body.provincia !== undefined && !bd.provinciasValidas.includes(body.provincia)) {
    errores.push(`La provincia debe ser una de: ${bd.provinciasValidas.join(', ')}.`);
  }
  if (body.telefono !== undefined && !/^\d{3}-\d{3}-\d{4}$/.test(body.telefono)) {
    errores.push('El teléfono debe tener el formato 809-000-0000.');
  }
  if (body.latitud !== undefined && (typeof body.latitud !== 'number' || body.latitud < -90 || body.latitud > 90)) {
    errores.push('La latitud debe ser un número entre -90 y 90.');
  }
  if (body.longitud !== undefined && (typeof body.longitud !== 'number' || body.longitud < -180 || body.longitud > 180)) {
    errores.push('La longitud debe ser un número entre -180 y 180.');
  }
  if (body.horarios !== undefined) {
    errores.push(...validarHorarios(body.horarios));
  }
  if (body.servicios !== undefined) {
    errores.push(...validarServiciosAsociados(body.servicios));
  }

  return errores;
}

// POST: todos los campos son obligatorios.
function completo(req, res, next) {
  const errores = validarCampos(req.body || {});
  if (errores.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
  }
  next();
}

// PATCH: valida solo los cambios de los campos
function parcial(req, res, next) {
  const body = req.body || {};

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ error: 'Debe enviar al menos un campo para actualizar.' });
  }
  if (body.id !== undefined) {
    return res.status(400).json({ error: 'No se puede modificar el campo "id".' });
  }

  const errores = validarCampos(body).filter(e =>
    !(e.startsWith('El campo "') && e.endsWith('" es obligatorio.'))
  );
  if (errores.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
  }
  next();
}

module.exports = { completo, parcial };