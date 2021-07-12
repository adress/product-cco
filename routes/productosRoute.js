const { Router } = require('express');
const { check } = require('express-validator');

const { index, store, update, destroy, show } = require('../controllers/productoController');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeProductoPorId } = require('../helpers/producto-validator');
const { reglas } = require('../middlewares/validar-campos-producto');

const router = Router();

//index
router.get('/', index);

//show
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], show);

//store
router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty().isString(),
    ...reglas,
    validarCampos
], store);

//update
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre', 'el nonbre debe ser un string').optional().isString(),
    ...reglas,
    validarCampos
], update)

//delete
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], destroy);

module.exports = router;