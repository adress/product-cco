const { validationResult } = require('express-validator');

//esta funcion valida que si hay errores al realizar las validaciones de la peticion
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next(); //continuar 
}

//valida que haya un archivo para subir
const validarArchivoSubir = (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos que subir'
        });
    }

    const allowImgExtension = ['jpg', 'png', 'gif', 'jpeg'];
    const fileExtension = req.files.archivo.name.split('.').pop();
    if (!allowImgExtension.includes(fileExtension)) {
        return res.status(400).json({
            msg: `Error: formatos permitidos ${allowImgExtension}`
        }); 
    }

    next();
}

module.exports = { validarCampos, validarArchivoSubir }