const express = require('express')
const dbConnection = require('./database/config')

require('dotenv').config()
const cors = require('cors')

//Servidor
const app = express()

//Conexión a la base de datos
dbConnection()

//CORS
app.use(cors())

//Directorio publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())

//Escuchar peticiones
app.listen(process.env.PORT, () => console.log(`Servidor establecido en puerto ${process.env.PORT}`))

app.use((req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})
