exports.middlewareGlobal = (req, res, next) =>{
    res.locals.OneLocalVar = ''
    next()
}

exports.checkCsrfTokenError = (err, req, res, next) =>{
    if(err){
        return res.render('404')
    }
}

exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken()
    next()
}