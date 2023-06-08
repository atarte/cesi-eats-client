class BaseError extends Error {
    
    statusCode: number

    constructor(message, statusCode, name) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        
        this.name = name
        this.statusCode = statusCode
        
        Error.captureStackTrace(this)
    }
}

export { BaseError }