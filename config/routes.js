const express = require('express')
const routes = express.Router()
var db = require("./database")


//Endopoint permite que os usuários do serviço obtenham todos os alunos cadastrados no sistema.
routes.get('/alunos', (req, res, next) => {
    //validando parametros requisição 
    var limiteDefault = 25
    if (req.query.limite === undefined)
        var query = 'select * from alunos LIMIT ' + limiteDefault

    if (req.query.limite && !(req.query.nome)) {
        var queryParamLimit = (req.query.limite)
        query = 'select * from alunos LIMIT ' + queryParamLimit
    }
    if (req.query.pagina)
        queryParamPag = (req.query.pagina)

    if (req.query.nome) {
        var queryParamNome = (req.query.nome)
        if (req.query.limite)
            var queryParamLimit = req.query.limite
        else
            queryParamLimit = limiteDefault
        var query = `select * from alunos where lower(nome) like '%${queryParamNome}%' LIMIT ` + queryParamLimit
    }

    //realizando consulta na base de dados e retornando os dados na response
    var params = []
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "response": "parâmetros inválidos" });
            return;
        }
        if (rows) {
            res.status(200).json({
                "response": rows
            })
        }
    })
})

//Endopoint permite que os usuários do serviço cadastrem novos alunos no sistema.
routes.post('/alunos', (req, res, next) => {
    var erros = []
    var situacao_aluno = 'ativo'
    var situacao_aluno

    //validando os parametros
    if (!req.body.rga)
        erros.push("Por favor, informe o RGA do aluno")

    if (!req.body.nome)
        erros.push("Por favor, informe o Nome do aluno")

    if (!req.body.nome)
        erros.push("Por favor, informe o Nome do aluno")

    if (req.body.situacao && req.body.situacao == 'inativo') {
        situacao_aluno = 'inativo'
    }
    //atribuindo valores do body para uma variavel
    var data = {
        rga: req.body.rga,
        nome: req.body.nome,
        curso: req.body.curso,
        situacao: req.body.situacao

    }

    //preparando consulta no banco
    var query = 'INSERT INTO alunos ( rga, nome, curso,situacao) values (?,?,?, ?)'
    var params = [data.rga, data.nome, data.curso, situacao_aluno]
    db.run(query, params)
    queryRes = `SELECT * FROM alunos ORDER BY ID DESC LIMIT 1`
    var params = []

    //realizando consulta na base de dados e retornando os dados na response
    db.all(queryRes, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(201).json({
            "response": rows
        })
    })


})

//métodos nao permitidos
routes.put('/alunos', (req, res, next) => {
        res.status(405).json({ "response": "Método não permitido" })
    })
    //métodos nao permitidos
routes.put('/alunos/:id', (req, res, next) => {
    res.status(405).json({ "response": "Método não permitido" })
})
routes.delete('/alunos', (req, res, next) => {
    res.status(405).json({ "response": "Método não permitido" })
})


routes.get('/alunos/:id', (req, res, next) => {
    var query = "select * from alunos where id = ?"
    var params = [req.params.id]
    db.get(query, params, function getAluno(err, row) {
        if (err) {
            res.status(404).json({ "response": "Not found" });
            return;
        }
        if (!row) {
            res.status(404).json({ "response": "Not found" });
            return;
        }
        if (row) {
            res.status(200).json({
                "response": row
            })
        }

    });
});

routes.put('/alunos:id', (req, res, next) => {
    query = `update alunos set nome = 'joao' where id = 1  `
    params[req.params.id]
    db.get(query, params, (err, row) => {
        res.status(200).json({
            "response": row
        })
    })

});




routes.delete('/alunos/:id', (req, res, next) => {
    var params = [req.params.id]
    var query = 'SELECT * FROM alunos WHERE id = ?'
    db.get(query, params, function getAluno(err, row) {
        // if (err) {
        //     res.status(404).json({ "response": "Not found" });
        //     return;
        // }
        if (!row) {
            res.status(404).json({ "response": "Not found" });
            //return;
        }
        if (row) {
            res.status(200).json({
                "response": row
            })
        }

    });
    db.run(
        'DELETE FROM alunos Where id = ?',
        req.params.id,
        function(err, result) {

            if (this.changes < 1) {
                res.status(404).json({ "response": "Not found" })
            }

        }
    )

})




module.exports = routes