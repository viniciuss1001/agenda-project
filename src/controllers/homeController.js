

exports.paginaInicial= (req, res)=>{
    res.render('index', {
        titulo: 'Este será o título da página',
        numeros: 1234
    })
}

exports.trataPost = (req, res) => {
    res.send("SOu sua rota de post")
}
