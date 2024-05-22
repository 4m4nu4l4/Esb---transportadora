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

app.put('/api/v1/products/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;

    const produto = produtos.find(prod => prod.id === id);
    if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    produto.nome = nome !== undefined ? nome : produto.nome;
    produto.preco = preco !== undefined ? preco : produto.preco;

    res.status(200).json(produto);
});

app.delete('/api/v1/products/:id', (req, res) => {
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


// Função para gerar um ID único para cada produto
/*function gerarId() {
    return Math.random().toString(36).substr(2, 9);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}*/

