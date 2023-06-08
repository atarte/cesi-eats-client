import express from 'express'
import { clientController } from './controllers/client.controller'
import { addressController } from './controllers/adress.controller'
import { banckingCardsController } from './controllers/bancking_cards.controller'
import { Error404 } from './errors/errors'

const { logError, returnError } = require('./errors/errorHandler')
const config = require('./config')

/**
 * App creation
 */
const app = express()

/**
 * Deffining requets parsing
 */
app.use(express.json())

// /**
//  * Authorization to connect to this api
//  */
// app.use(cors())

/**
 * Route handling
 */
app.use('/client', clientController)
app.use('/client/address', addressController)
app.use('/client/bancking_cards', banckingCardsController)

// default route
app.use('*', (req, res) => {
    throw new Error404('Invalid route, this path does not exist.')
})

/**
 * Root page
 */
// app.get('/', (req, res) => res.send('hello world'))

/**
 * Errors handling
 */
app.use(logError)
app.use(returnError)

/**
 * Lauching serveur
 */
app.listen(config.port, () => console.log('Starting server listening on port', config.port))