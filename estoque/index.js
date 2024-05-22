const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const produtos = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function adicionarPrateleira(produto, preco, posicao) {
    await sleep(3000);
    try {
        await axios.post('http://localhost:3002/api/v1/shelf', { produto, preco, posicao });
    } catch (error) {
        console.error('Erro ao adicionar prateleira:', error.message);
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/v1/products', (req, res) => {
    res.status(200).json(produtos);
});

app.post('/api/v1/products', async (req, res) => {
    try {
        const { nome, preco } = req.body;
        const produto = { nome, preco };
        produtos.push(produto);

        await adicionarPrateleira(nome, preco, nome.substring(0, 1));
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});