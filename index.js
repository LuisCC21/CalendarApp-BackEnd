const express = require('express')
const dbConnection = require('./database/config')
require('dotenv').config()
var cors = require('cors')

//Crear el servidor de express
const app = express()

//Base de datos
dbConnection()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true)
    } else {
      // No esta permitido
      callback(new Error('Error de Cors'))
    }
  },
}

app.use(cors(corsOptions))

//Directorio Publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json()) // todo lo que pase en formato json, pasara por aqui

//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.get('*', (req, res) => {
  //clase 429
  res.sendFile(__dirname + '/public/index.html')
})

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})
