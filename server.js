import { config } from "dotenv-safe";
config()

import jwt from 'jsonwebtoken'
import express from 'express'
import http from 'http'
import bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.json({message:"servidor base / funcionando!"
    })
})

const server = http.createServer(app)
server.listen(3000)
console.log("Servidor em execução 3000...")

