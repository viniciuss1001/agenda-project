//ligação com o dotenv
require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const path = require('path')
const mongoose = require('mongoose')
const { middlewareGlobal, checkcrsfError,csrfMiddleware } = require('./src/middleware/globalMiddleware')

//string de conexão
mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>{
        console.log('Conectado a base de dados.')
        app.emit('pronto')
    })
    .catch(e => console.log(e));

//trabalhando com sessões
const session = require('express-session')
const mongoStore = require('connect-mongo')
const flashMessage = require('connect-flash')
const helmet = require('helmet')
const csrf = require('csurf')


app.use(
    express.urlencoded(
        {
            extended: true
        }
    )
)
//uso de conteúdo estático
app.use(express.static('./public'))


//sessões
const sessionOptions = session({
    secret: 'aaaaaahiuasdau',
    //store: new mongoStore({mongooseConnection: mongooseConnection}),
    resave: false,
    saveUninitialized: false,
    cookie: {//configura o tempo em que o cookie ficará ativo para o navegador
        maxAge: 1000 * 60 * 60 * 24 *7, //1 semana
        httpONly: true
    },
    store: mongoStore.create({mongoUrl: process.env.CONNECTION_STRING})
})

app.use(sessionOptions)
app.use(flashMessage())

//parte do código para usar as todas do arquivo
app.use(csrf())
app.use(middlewareGlobal)
app.use(csrfMiddleware)
app.use(checkcrsfError)
app.use(routes)
//rota absoluta das rotas
app.set('views', path.resolve(__dirname, 'src','views'))
//engine de redenrização
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.send('Hello World!'))

//verificação para que a aplicação só funcione após a conexão com o bando de dados
app.on('pronto', () => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
})
