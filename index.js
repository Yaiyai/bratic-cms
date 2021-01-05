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

//Rutas
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/companies', require('./routes/company.routes'))
app.use('/api/sections', require('./routes/section.routes'))
app.use('/api/posts', require('./routes/post.routes'))
app.use('/api/galleries', require('./routes/gallery.routes'))
app.use('/api/sliders', require('./routes/slider.routes'))
app.use('/api/videos', require('./routes/video.routes'))

//Escuchar peticiones
app.listen(process.env.PORT, () => console.log(`Servidor establecido en puerto ${process.env.PORT}`))

app.use((req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})
