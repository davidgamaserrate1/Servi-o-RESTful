const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./config/routes')
//
// const kill = require('kill-port')
// const http = require('http')
// const port = 8080
// //
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(57466, () => {
    console.log(`Aplicação rodando em http://localhost:57466`)
})



