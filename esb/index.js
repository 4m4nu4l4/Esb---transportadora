const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const produtos = [];
const transportes = [];

// Middleware para log de requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rotas para o serviço de produtos
app.get('/api/esb', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/api/estoque');
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

app.post('/api/estoque', async (req, res) => {
    try {
        const { nome, categoria, quantidade, status_prod } = req.body;
        const produto = { id, nome, categoria, quantidade, status_prod };
        produtos.push(produto);
        const transporteData = {
            id: produto.id,
            nomeDoEstoque: nomeDoEstoque.nome, 
            localizacao: localizacao.localizacao, 
            valorDoTransporte: 0,
            cnpj: cnpj 
        };
        await axios.post('http://localhost:3000/api/transporte', transporteData);

        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/estoque', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, categoria, quantidade, status_prod } = req.body;

        const response = await axios.put(`http://localhost:3001/api/estoque/${id}`, {
            nome,
            categoria,
            quantidade,
            status_prod
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

app.delete('/api/estoque', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await axios.delete(`http://localhost:3001/api/estoque/${id}`);

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// Rota para adicionar transporte
app.post('/api/transporte', async (req, res) => {
    try {
        const { id, nomeDoEstoque, produto, localizacao, valorDoTransporte, cnpj } = req.body;
        const transporte = {
            id: id || gerarId(),
            nomeDoEstoque,
            produto,
            localizacao,
            valorDoTransporte,
            cnpj
        };
        transportes.push(transporte);
        res.status(201).json(transporte);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3002, () => {
    console.log('ESB rodando na porta 3002');
});
