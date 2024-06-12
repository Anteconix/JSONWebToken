import { config } from "dotenv-safe";
config()

import jwt from 'jsonwebtoken'
import express from 'express'
import http from 'http'
import bodyParser from "body-parser";
import { verify } from "crypto";

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.json({message:"servidor base / funcionando!"
    })
})

app.get('/exemplo', verifyJWT, (req, res, next) => {
    console.log("Retorno do exemplo 'mockado' ...")
    res.json([{id:1,nome:'bryann'}])
})

app.post('/login', verifyJWT, (res, req, next) => {
    if ((req.body.user === 'bryann') && (req.body.pwd === '123')) {
        const id = 1
        const token =jwt.sign({ id }, process.env.SECRET, {
            expiresIn:300
        })
        return res.json({ auth: true, token: token })
    }
    res.status(500).json({message:" Login Inválido"})
})

app.post('/logout', function(req, res){
    res.json({auth:false, token:null})
})

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    if(!token) return res.status(401).json({auth: false, message:"Não há token"})

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({auth:false, message:'Erro com a Autenticação do token'})
    })
    req.userId = decoded.id
    next ()
}
const server = http.createServer(app)
server.listen(3000)
console.log("Servidor em execução 3000...")

