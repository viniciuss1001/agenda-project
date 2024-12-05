exports.middlewareGlobal = (req, res, next) =>{
    res.locals.erros = req.flash('erros')
    res.locals.sucess = req.flash('sucess')
    res.locals.user = req.session.user;
    next()
}

exports.checkCsrfTokenError = (err, req, res, next) =>{
    if(err){
        return res.render('404')
    }
    next()
}

exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired = (req, res, next) =>{
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer o login.')
        req.session.save(()=>{
            res.redirect('/')
        })
        return
    }
    next()
}