const { Router } = require('express');
const { check } = require('express-validator');

const { actualizarImagenCloudinary } = require('../controllers/uploadController');
const { validarCampos, validarArchivoSubir } = require('../middlewares/validar-campos');
const { existeProductoPorId } = require('../helpers/producto-validator');

const router = Router();

router.put('/productos/:id', [
    check('id', 'id no válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarArchivoSubir,
    validarCampos
], actualizarImagenCloudinary);

module.exports = router;