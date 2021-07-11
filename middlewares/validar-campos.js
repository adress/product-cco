const { validationResult } = require('express-validator');

//esta funcion valida que si hay errores al realizar las validaciones de la peticion
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next(); //continuar 
}
module.exports = { validarCampos }