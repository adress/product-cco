const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
//const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        //configuracion del servidor
        this.app = express();
        this.port = process.env.PORT;

        this.conectardb();  //conexion con la base de datos
        this.middlewares(); //configuracion de los middlewares
        this.routes();      //configuracion de las rutas
    }

    //conexion con la base de datos
    async conectardb() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors()); //previene el cross original acess error.
        this.app.use(express.json()) //escritura y parseo del body
        this.app.use(express.static('public')) //middleware define la carpeta publica
        // //carga de archivos
        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
        //     createParentPath: true
        // }));
    }

    //definicion de las rutas del servidor
    routes() {
        this.app.use('/api/productos', require('./routes/productosRoute'));
    }

    //up server
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor inicializado en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;