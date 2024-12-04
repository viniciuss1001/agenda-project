const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const path = require('path')

app.use(
    express.urlencoded(
        {
            extended: true
        }
    )
)
//uso de conteúdo estático
app.use(express.static('./public'))

//parte do código para usar as todas do arquivo
app.use(routes)
//rota absoluta das rotas
app.set('views', path.resolve(__dirname, 'src','views'))
//engine de redenrização
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`App listening on port ${port}!`))
//seguir o modo do CRUD

/**
//criar uma nova rota
app.get('/hello', (req, res)=> res.send(
    'Obrigado e bem vindo!'
))

app.get('/testes/:idUser?', (req, res)=>{
    console.log(req.params)
    res.send(
        '<h1>Olá </h1>'
    )
})

//req.params, req.query e req.body
/**
 * query strings são iniciadas com o caractere de ?
 * quando enviamos um formulário, os dados enviados vem no req.body
 */

//express routers
/**
 * cada termo após o / é uma rota
 * o arquivo de routes serve para alocar todas as rotas da aplicação
 */
