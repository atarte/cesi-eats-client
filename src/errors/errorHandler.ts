function logError (err) {
    console.error(err)
}

function logErrorMiddleware (err, req, res, next) {
    logError(err)
    next(err)
}

function returnError (err, req, res, next) {
    res.status(err.statusCode || 500).json({
        name: err.name,
        message: err.message
    })
}

export { logError, logErrorMiddleware, returnError }