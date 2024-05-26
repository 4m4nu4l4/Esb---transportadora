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


app.listen(3002, () => {
    console.log('ESB rodando na porta 3002');
});
