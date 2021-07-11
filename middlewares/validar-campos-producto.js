const { check } = require('express-validator');

const reglas = [
    check('revision', "La revision debe ser valor boolean").optional().isBoolean(),
    check('correoProveedor', "Correo proveedor debe se un correo valido").optional().isEmail(),
    check('tags', 'El parametro tags debe se un arreglo de string').optional().isArray(),
    check('tags.*', 'los tags deben ser cadenas').optional().isString(),
    check('precio', 'el paramentro precio debe ser numerico').optional().isNumeric(),
    check('unidadesDisponibles', 'el paramentro unidadesDisponibles debe ser numerico').optional().isNumeric(),
    check('unidadesVendidas', 'el paramentro unidadesVendidas debe ser numerico').optional().isNumeric(),
    check('descripcion', 'la descripcion debe ser un string').optional().isString(),
    check('img', 'el campo img debe ser un string').optional().isString()
]

module.exports = { reglas }