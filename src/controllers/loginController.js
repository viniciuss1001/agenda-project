const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logged')
    return res.render('login')
}

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body)
        await login.register()
        
        if(login.error.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function(){
                return res.redirect('back')
            })
            return
        }

        req.flash('sucess', 'Seu usuário foi criado com sucesso')
        req.session.save(function(){
            return res.redirect('back')
        })

    } catch (error) {
        console.log(error)
        return res.render('./includes/404')
    }
}

exports.login = async function (req, res) {
    try {
        const login = new Login(req.body)
        await login.login()
        
        if(login.error.length > 0 ){
            req.flash('errors', login.error)
            req.session.save(()=>{
                return res.redirect('back')
            })
            return
        }

        req.flash('sucess', 'Você entrou no sistema')
        req.session.user = login.user
        req.session.save(()=>{
            return res.redirect('back')
        })


    } catch (error) {
        console.log(error)
        return res.render('.includes/404')
    }
}

exports.logout = function(req, res) {
    res.session.destroy()
    res.redirect('/')
}