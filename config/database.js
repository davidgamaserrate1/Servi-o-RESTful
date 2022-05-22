var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"

//criando tabela de alunons, de acordoc com os dados fornecidos
let db = new sqlite3.Database(DBSOURCE, () => {
    console.log('SQLite conectado com sucesso!! .')
    db.run(
        `CREATE TABLE IF NOT EXISTS  alunos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rga TEXTNOT NULL, 
            situacao TEXT DEFAULT 'ativo', 
            curso TEXT, 
            nome TEXT NOT NULL,  
            registrado_em DATETIME NOT NULL DEFAULT (strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime'))
             
            )`
    );
});


module.exports = db