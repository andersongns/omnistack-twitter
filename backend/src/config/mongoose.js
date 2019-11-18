const mongoose = require('mongoose')

mongoose.connect('mongodb://twitter:omn1stack@ds018558.mlab.com:18558/omnistack-twitter', { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
	console.info('Mongoose conectado')
}).catch( err => {
	console.error(err)
})