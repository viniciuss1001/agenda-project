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

app.get('/', (req, res) => res.send('index'))
app.listen(port, () => console.log(`App listening on port ${port}!`))
