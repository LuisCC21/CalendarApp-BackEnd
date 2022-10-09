const express = require('express');
const dbConnection = require('./database/config');
require('dotenv').config();
var cors = require('cors');

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());


//Directorio Publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json()); // todo lo que pase en formato json, pasara por aqui

//Rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/events',require('./routes/events'));



//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);

})