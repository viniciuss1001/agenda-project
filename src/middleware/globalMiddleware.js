exports.middlewareGlobal = (req, res, next) =>{
    next()
}

exports.checkcrsfError = (err, req, res, next) => {
    if(err && 'EBADCSRFTOKEN' === err.token){
        return res.send.send('erro')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.crsfToken = req.crsfToken()
    next()
}