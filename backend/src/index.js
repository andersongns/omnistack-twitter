const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const server = require('http').Server(app)
const io = require('socket.io')(server)

require('./config/mongoose')

app.use((req, res, next) => {
	req.io = io
	return next()
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'))
app.use( '/', express.static( path.resolve(__dirname,'..', 'public') ) )

server.listen(8080, () => {
	console.log('Servidor rodando...')
})
