const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/establecimientos');
const { completo, parcial } = require('../middleware/validarEstablecimiento');

router.get('/', ctrl.listar);
router.get('/:id', ctrl.obtener);
router.post('/', completo, ctrl.crear); // Hacen falta todos los datos
router.patch('/:id', parcial, ctrl.actualizar); // Cambios en algunos datos
router.delete('/:id', ctrl.eliminar);

module.exports = router;