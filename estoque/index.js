const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const produtos = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function adicionarEstoque(nome, categoria, quantidade) {
    await sleep(3000);
    try {
        await axios.post('http://localhost:3001/api/v1/stock', { nome, categoria, quantidade });
    } catch (error) {
        console.error('Erro ao adicionar estoque:', error.message);
    }
}

app.get('/', (req, res) => {
    res.send('Bem vindo, nossa equipe é composta por: Carolaine, Emanuele e Maria Eduarda!');
});

app.get('/api/products', (req, res) => {
    res.status(200).json(produtos);
});

app.post('/api/products', async (req, res) => {
    try {
        const { nome, categoria, quantidade, status_prod } = req.body;
        const produto = { id: gerarId(), nome, categoria, quantidade, status_prod };
        produtos.push(produto);

        await adicionarEstoque(nome, categoria, quantidade); 
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { nome, categoria, quantidade, status_prod } = req.body;

    const produto = produtos.find(prod => prod.id === id);
    if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    produto.nome = nome !== undefined ? nome : produto.nome;
    produto.categoria = categoria !== undefined ? categoria : produto.categoria;
    produto.quantidade = quantidade !== undefined ? quantidade : produto.quantidade;
    produto.status_prod = status_prod !== undefined ? status_prod : produto.status_prod;

    res.status(200).json(produto);
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;

    const index = produtos.findIndex(prod => prod.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const [deletedProduct] = produtos.splice(index, 1);

    res.status(200).json(deletedProduct);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

function gerarId() {
    return Math.random().toString(36).substr(2, 9);
}
