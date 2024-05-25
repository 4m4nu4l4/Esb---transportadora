const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

// Middleware para log de requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rotas para o serviço de produtos
app.post('/esb/products', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/api/products', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

app.put('/esb/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.put(`http://localhost:3000/api/products/${id}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

app.delete('/esb/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.delete(`http://localhost:3000/api/products/${id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

app.get('/esb/products', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/products');
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

app.listen(3002, () => {
    console.log('ESB rodando na porta 3002');
});
