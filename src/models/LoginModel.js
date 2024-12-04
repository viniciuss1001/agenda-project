const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login{
    constructor(body){
        this.body = body
        this.error = []
        this.user = null
    }

    async login(){
        this.valida()
        if(this.error.length > 0) return

        this.user = await LoginModel.findOne({email: this.body.email})

        if(!this.user){
            this.error.push('Usuário não encontrado')
            return
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.error.push('Senha inválida')
            this.user = null
            return
        }
    }

    async register(){
        this.valida()
        if(this.error.length >0) return

        await this.userExists()

        if(this.error.length >0) return

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        this.user = await LoginModel.create(this.body)
    }

    async userExists(){
        this.user = await LoginModel.findOne({email: this.body.email})

        if(this.user){
            this.error.push('Esse usuário já existe')
        }

    }

    valida(){
        this.cleanUp()

        //validação
        //email
        if(!validator.isEmail(this.body.email)) {
            this.error.push('Email inválido')
        }
        //senha 3-20
        if(!this.body.password.length < 3 || this.body.password.length > 20){
            this.error.push('A senha precisa ter entre 3 e 20 caracteres')
        }
    }
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login