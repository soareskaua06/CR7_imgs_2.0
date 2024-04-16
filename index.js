const dados = require('./dados.json')
const express = require('express')
const fs = require('fs')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())

server.listen(3000, () => {
    console.log("O servidor está funcional");
})

server.get('/jogadores', (req, res) => {
    return res.json({ mensagem: "Estou funcionando!" })
})

// CRUD DA API

// Create da API
server.post('/jogadores', (req, res) => {
    const novoJogador = req.body

    if (!novoJogador.nome || !novoJogador.posicao || !novoJogador.contrato || !novoJogador.url) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dados.Jogadores.push(novoJogador)
        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completos, cadastro feito com sucesso!" })
    }
})

// Read da API
server.get('/jogadores', (req, res) => {
    return res.json(dados.Jogadores)
})

// Update da API
server.put('/jogadores/:id', (req, res) => {
    const jogadorId = parseInt(req.params.id)
    const atualizarJogador = req.body

    const indiceJogador = dados.Jogadores.findIndex(u => u.id === jogadorId)

    if (indiceJogador === -1) {
        return res.status(404).json({ mensagem: "Jogador não encontrado" })
    } else {
        dados.Jogadores[indiceJogador].nome = atualizarJogador.nome || dados.Jogadores[indiceJogador].nome
        
        dados.Jogadores[indiceJogador].posicao = atualizarJogador.posicao || dados.Jogadores[indiceJogador].posicao

        dados.Jogadores[indiceJogador].contrato = atualizarJogador.contrato || dados.Jogadores[indiceJogador].contrato

        dados.Jogadores[indiceJogador].url = atualizarJogador.url || dados.Jogadores[indiceJogador].url

        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})


//Delete da API
server.delete('/jogadores/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // filtrar os usuarios, removendo pelo id correspondente

    dados.Jogadores = dados.Jogadores.filter(u => u.id !== id)

    salvarDados(dados)

    return res.status(200).json({ mensagem: "Usuario excluido com sucesso!" })
})

// Função que salva os dados
function salvarDados() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dados, null, 2))
}