require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING, {

    useNewUrlParser: true, 
    
    useUnifiedTopology: true 
    
    }, err => {
    if(err) throw err;
        console.log('Connected to MongoDB!!!')
        //app.emit('all')
    })
    /*
.then(()=>{
    app.emit('All')
}).catch(e=>console.log(e))
*/

const session = require('express-session')
const flash = require('connect-flash')
const csrf = require('csurf')
const {middlewareGlobal, checkCsrfTokenError,csrfMiddleware} = require('./src/middleware/globarMiddleware')
const MongoStore = require('connect-mongo')


app.use(
    express.urlencoded(
        {
            extended: true
        }
    )
)

const sessionOptions = session({
    secret:'kakakkakskksaksdkjhashakfahfjksa',
    store: MongoStore.create({mongoUrl: process.env.CONNECTION_STRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 *60 *24 *7,
        httpOnly: true
    }
})
app.use(sessionOptions)

app.use(express.json())
app.use(flash())
//uso de conteúdo estático
app.use(express.static('./public'))

//parte do código para usar as todas do arquivo
app.use(routes)
//rota absoluta das rotas
app.set('views', path.resolve(__dirname, 'src','views'))
//engine de redenrização
app.set('view engine', 'ejs')

//encriptação e segurança
app.use(csrf())
app.use(checkCsrfTokenError)
app.use(csrfMiddleware)

//app.on('all', ()=>{
    app.listen(port, () => console.log(`App listening on port ${port}!`))

//})