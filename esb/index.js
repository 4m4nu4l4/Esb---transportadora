const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/api/v1/shelf', async (req, res) => {
    const { produto, preco, posicao } = req.body;

    try {
        const response = await axios.post('http://localhost:3001/api/v1/shelf', { produto, preco, posicao });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3002, () => {
    console.log('ESB rodando na porta 3002');
});