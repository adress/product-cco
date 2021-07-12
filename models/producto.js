const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    precio: {
        type: Number,
        default: 0
    },
    revision: {
        type: Boolean,
        default: false
    },
    ultimaRevision: {
        type: Date,
    },
    descripcion: {
        type: String
    },
    img: {
        type: String,
    },
    correoProveedor: {
        type: String,
    },
    unidadesDisponibles: {
        type: Number,
        default: 0
    },
    unidadesVendidas: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
});

ProductoSchema.plugin(mongoosePaginate);

ProductoSchema.methods.toJSON = function () {
    //remueve  __v al realizar .toJSON
    const { __v, _id, ...producto } = this.toObject();
    producto.id = _id; //remplaze _id to id
    return producto;
}

module.exports = model('Producto', ProductoSchema)