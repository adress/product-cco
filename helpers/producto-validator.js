
const Producto = require('../models/producto');

const existeProductoPorId = async (id) => {
    //verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id: ${id} no existe`);
    }
}

module.exports = { existeProductoPorId }