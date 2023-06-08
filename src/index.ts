import express from 'express'
import { clientController } from './controllers/client.controller'
import { addressController } from './controllers/adress.controller'
import { banckingCardsController } from './controllers/bancking_cards.controller'
const { logError, returnError } = require('./errors/errorHandler')

const config = require('./config')

/**
 * On créé une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

// /**
//  * On dit à Express que l'on souhaite autoriser tous les noms de domaines
//  * à faire des requêtes sur notre API.
//  */
// app.use(cors())

/**
 * Toutes les routes
 */
app.use('/client', clientController)
app.use('/client/address', addressController)
app.use('/client/bancking_cards', banckingCardsController)

/**
 * Homepage
 */
// app.get('/', (req, res) => res.send('🏠'))

/**
 * Errors handling
 */
app.use(logError)
app.use(returnError)


/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(config.port, () => console.log('Starting server listening on port', config.port))