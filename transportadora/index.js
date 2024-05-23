const express = require('express');

const app = express();

app.use(express.json());

const prateleiras = [];

function gerarId() {
    return Math.random().toString(36).substr(2, 9);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/v1/shelf', (req, res) => {
    res.status(200).json(prateleiras);
});

app.post('/api/v1/shelf', (req, res) => {
    const { produto, preco, posicao } = req.body;
    const prateleira = { id: gerarId(), produto, preco, posicao };
    prateleiras.push(prateleira);
    res.status(201).json(prateleira);
});

app.put('/api/v1/shelf/:id', (req, res) => {
    const { id } = req.params;
    const { produto, preco, posicao } = req.body;

    const prateleira = prateleiras.find(p => p.id === id);
    if (!prateleira) {
        return res.status(404).json({ error: 'Prateleira não encontrada' });
    }

    prateleira.produto = produto !== undefined ? produto : prateleira.produto;
    prateleira.preco = preco !== undefined ? preco : prateleira.preco;
    prateleira.posicao = posicao !== undefined ? posicao : prateleira.posicao;

    res.status(200).json(prateleira);
});

app.delete('/api/v1/shelf/:id', (req, res) => {
    const { id } = req.params;

    const index = prateleiras.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Prateleira não encontrada' });
    }

    const [deletedPrateleira] = prateleiras.splice(index, 1);

    res.status(200).json(deletedPrateleira);
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
