const { response, request } = require('express')
const Producto = require('../models/producto');

/**
 * Muestra una lista de productos.
 * @return una lista paguinada de los productos
 */
const index = async (req = request, res = response) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const options = {
        page,
        limit,
        customLabels: {
            totalDocs: 'total',
            docs: 'productos',
        },
    };

    const productos = await Producto.paginate({}, options);
    res.json(productos);
}

/**
 * Almacena un Producto recién creado en la base de datos.
 * @param req.body información del producto a crear
 * @return JSON con la información del producto creado
 */
const store = async (req, res = response) => {
    const { ultimaRevision, created_at, ...body } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya se encuentra en la base de datos`
        });
    }

    data = { ...body, nombre, }
    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}

/**
 * Display the specified resource.
 *
 * @param  int  $id
 * @return 
 */
const show = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}

/**
 * Update the specified resource in storage.
 * @param  int  $id
 * @return 
 */
const update = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ultimaRevision, created_at, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    //new true devuele el documento actualziado
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(producto);
}

/**
 * Remove the specified resource from storage.
 *
 * @param  int  $id
 * @return 
 */
const destroy = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).deleteOne();
    res.json(producto);
}

module.exports = {
    index,
    store,
    update,
    destroy,
    show
}