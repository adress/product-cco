require('dotenv').config(); //read .env variables
const cron = require('node-cron');

const Producto = require('./models/producto')
const Server = require('./server');

//start server
const server = new Server();
server.listen();

//Creación de un cron job que se ejecuta cada minuto
cron.schedule("* * * * *", async () => {
    await Producto.updateMany(
        { "revision": true },
        { "$set": { "ultimaRevision": new Date() } },
        { "multi": true });
});