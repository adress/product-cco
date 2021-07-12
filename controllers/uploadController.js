const { response } = require('express');
const cloudinary = require('cloudinary').v2

const Producto = require('../models/producto');

cloudinary.config(process.env.CLOUDINARY_URL);

const actualizarImagenCloudinary = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    //verificar si tiene una imagen previa
    if (producto.img) {
        //borrar imgen de cloudianry
        const nombreArr = producto.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath); //subir a cloudinary

    producto.img = secure_url;
    producto.save();

    res.json({ producto });
}


module.exports = { actualizarImagenCloudinary }