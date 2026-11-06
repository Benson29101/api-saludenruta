const provinciasValidas = ['Barahona', 'Bahoruco', 'Independencia', 'Pedernales'];
const tiposValidos = ['Hospital', 'Centro de Atención Primaria', 'Centro de Salud'];
const diasValidos = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const disponibilidadesValidas = ['disponible', 'limitada', 'no disponible'];

const servicios = [
  { id: 1, nombre: 'Pediatría', categoria: 'Especialidad', descripcion: 'Atención médica para niños y adolescentes.' },
  { id: 2, nombre: 'Laboratorio clínico', categoria: 'Diagnóstico', descripcion: 'Análisis de sangre, orina y otros estudios.' },
  { id: 3, nombre: 'Ginecología y obstetricia', categoria: 'Especialidad', descripcion: 'Salud de la mujer y control del embarazo.' },
  { id: 4, nombre: 'Medicina general', categoria: 'Atención primaria', descripcion: 'Consulta médica general y seguimiento.' },
  { id: 5, nombre: 'Emergencias', categoria: 'Urgencia', descripcion: 'Atención de urgencias.' },
  { id: 6, nombre: 'Odontología', categoria: 'Especialidad', descripcion: 'Salud bucal.' }
];

const establecimientos = [
  {
    id: 1,
    nombre: 'Hospital Regional Universitario Jaime Mota',
    tipo: 'Hospital',
    provincia: 'Barahona',
    municipio: 'Barahona',
    direccion: 'Av. Casandra Damirón No. 7, esq. Víctor Matos, Ensanche Naco',
    telefono: '809-524-2586',
    latitud: 18.2085,
    longitud: -71.1004,
    horarios: [
      { dia: 'lunes', apertura: '08:00', cierre: '16:00' },
      { dia: 'martes', apertura: '08:00', cierre: '16:00' },
      { dia: 'miércoles', apertura: '08:00', cierre: '16:00' },
      { dia: 'jueves', apertura: '08:00', cierre: '16:00' },
      { dia: 'viernes', apertura: '08:00', cierre: '16:00' }
    ],
    servicios: [
      { servicio_id: 1, disponibilidad: 'disponible', requisitos: 'Cédula del niño y carnet de vacunas' },
      { servicio_id: 2, disponibilidad: 'disponible', requisitos: 'Orden médica' },
      { servicio_id: 5, disponibilidad: 'disponible', requisitos: 'Ninguno (emergencia 24h)' }
    ]
  },
  {
    id: 2,
    nombre: 'Hospital Provincial San Bartolomé',
    tipo: 'Hospital',
    provincia: 'Bahoruco',
    municipio: 'Neiba',
    direccion: 'Calle Eduardo Alonso Pérez Jiménez, esq. Av. 27 de Febrero',
    telefono: '809-527-3308',
    latitud: 18.4897,
    longitud: -71.4186,
    horarios: [
      { dia: 'lunes', apertura: '08:00', cierre: '16:00' },
      { dia: 'martes', apertura: '08:00', cierre: '16:00' },
      { dia: 'miércoles', apertura: '08:00', cierre: '16:00' },
      { dia: 'jueves', apertura: '08:00', cierre: '16:00' },
      { dia: 'viernes', apertura: '08:00', cierre: '16:00' }
    ],
    servicios: [
      { servicio_id: 2, disponibilidad: 'limitada', requisitos: 'Orden médica' },
      { servicio_id: 4, disponibilidad: 'disponible', requisitos: 'Cédula' },
      { servicio_id: 5, disponibilidad: 'disponible', requisitos: 'Ninguno (emergencia 24h)' }
    ]
  },
  {
    id: 3,
    nombre: 'Centro Clínico y Diagnóstico de Atención Primaria Jimaní',
    tipo: 'Centro de Atención Primaria',
    provincia: 'Independencia',
    municipio: 'Jimaní',
    direccion: 'Avenida Gaspar Polanco',
    telefono: '809-991-1701',
    latitud: 18.4917,
    longitud: -71.8500,
    horarios: [
      { dia: 'lunes', apertura: '08:00', cierre: '16:00' },
      { dia: 'martes', apertura: '08:00', cierre: '16:00' },
      { dia: 'miércoles', apertura: '08:00', cierre: '16:00' },
      { dia: 'jueves', apertura: '08:00', cierre: '16:00' },
      { dia: 'viernes', apertura: '08:00', cierre: '16:00' }
    ],
    servicios: [
      { servicio_id: 1, disponibilidad: 'disponible', requisitos: 'Cédula del niño' },
      { servicio_id: 4, disponibilidad: 'disponible', requisitos: 'Cédula' },
      { servicio_id: 6, disponibilidad: 'disponible', requisitos: 'Cédula' }
    ]
  },
  {
    id: 4,
    nombre: 'Hospital Provincial Dr. Elio Fiallo',
    tipo: 'Hospital',
    provincia: 'Pedernales',
    municipio: 'Pedernales',
    direccion: 'Calle Duarte #58',
    telefono: '809-518-1313',
    latitud: 18.0333,
    longitud: -71.7500,
    horarios: [
      { dia: 'lunes', apertura: '08:00', cierre: '16:00' },
      { dia: 'martes', apertura: '08:00', cierre: '16:00' },
      { dia: 'miércoles', apertura: '08:00', cierre: '16:00' },
      { dia: 'jueves', apertura: '08:00', cierre: '16:00' },
      { dia: 'viernes', apertura: '08:00', cierre: '16:00' },
      { dia: 'sábado', apertura: '08:00', cierre: '16:00' }
    ],
    servicios: [
      { servicio_id: 4, disponibilidad: 'disponible', requisitos: 'Cédula' },
      { servicio_id: 5, disponibilidad: 'disponible', requisitos: 'Ninguno (emergencia 24h)' }
    ]
  }
];

// Genera el próximo ID
function siguienteId(lista) {
  return lista.length ? Math.max(...lista.map(x => x.id)) + 1 : 1;
}

module.exports = {
  provinciasValidas,
  tiposValidos,
  diasValidos,
  disponibilidadesValidas,
  servicios,
  establecimientos,
  siguienteId
};