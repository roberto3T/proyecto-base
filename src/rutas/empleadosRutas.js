const express = require('express');
const router = express.Router();

const empleadosControlador = require('../controlador/empleadosControlador');

router.get('/', empleadosControlador.obtenerEmpleados);
router.get('/:id', empleadosControlador.obtenerEmpleadoPorID);
router.post('/', empleadosControlador.crearEmpleado);
router.post('/crear', empleadosControlador.crearEmpleado); // ruta original, se conserva
router.put('/:id', empleadosControlador.actualizarEmpleado);
router.delete('/:id', empleadosControlador.eliminarEmpleado);

module.exports = router;