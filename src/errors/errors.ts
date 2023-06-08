import { BaseError } from "./baseError"

const httpStatusCodes = require('./httpStatusCodes')

class Error400 extends BaseError {
    constructor(
        message,
        statusCode = httpStatusCodes.BAD_REQUEST,
        name = 'Bad Request'
    ) {
        super(message, statusCode, name)
    }
}


class Error404 extends BaseError {
    constructor(
        message,
        statusCode = httpStatusCodes.NOT_FOUND,
        name = 'Not Found'
    ) {
        super(message, statusCode, name)
    }
}

class Error500 extends BaseError {
    constructor(
        message,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        name = 'Internal Server'
    ) {
        super(message, statusCode, name)
    }
}

export { Error400, Error404, Error500 }