const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/servicios');

router.get('/', ctrl.listar);
router.get('/:id/establecimientos', ctrl.establecimientosPorServicio);
router.get('/:id', ctrl.detalle);

module.exports = router;