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

app.get('http://localhost:3001/api/transporte', (req, res) => {
    res.status(200).json(prateleiras);
});

app.post('http://localhost:3001/api/transporte', (req, res) => {
    const { produto, preco, posicao } = req.body;
    const prateleira = { id: gerarId(), produto, preco, posicao };
    prateleiras.push(prateleira);
    res.status(201).json(prateleira);
});

app.put('http://localhost:3001/api/transportes/:id', async (req, res) => {
    const { id } = req.params;
    const { produto, preco, posicao } = req.body;

    const prateleira = prateleiras.find(p => p.id === id);
    if (!prateleira) {
        return res.status(404).json({ error: 'Prateleira não encontrada' });
    }

    prateleira.produto = produto !== undefined ? produto : prateleira.produto;
    prateleira.preco = preco !== undefined ? preco : prateleira.preco;
    prateleira.posicao = posicao !== undefined ? posicao : prateleira.posicao;

    // Atualiza o status do produto no serviço de estoque
    try {
        await axios.put(`http://localhost:3000/api/products/${prateleira.produto}`, {
            status_prod: prateleira.status
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar o status do produto no serviço de estoque' });
    }

    res.status(200).json(prateleira);
});

app.delete('http://localhost:3001/api/transportes/:id', (req, res) => {
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
