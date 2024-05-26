const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const produtos = [];
const transportes = [];

app.get('/', (req, res) => {
    res.send('Bem vindo, nossa equipe é composta por: Carolaine, Emanuele e Maria Eduarda!');
});
app.get('/api/transporte', async (req, res) => {

    try {
        const response = await axios.get('http://localhost:3002/api/esb');

        res.status(201).json(response.data);
    } catch (error) {
        res.status(400).json({error: error.message});

    }
});

/*RF08 - A transportadora deve adicionar o produto pelo seu id, nome do estoque, localização, valor do transporte, Cnpj.*/

app.post('/api/transporte', async (req, res) => {
    try {
        const { id, nomeDoEstoque, produto, localizacao, valorDoTransporte, cnpj } = req.body;
        const transporte = {
            id: id,
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

app.put('/api/transporte/:id', (req, res) => {
    const { id } = req.params;
    const { nomeDoEstoque, produto, localizacao, valorDoTransporte, cnpj  } = req.body;

    const transporte = transportes.find(transp => transp.id === id);
    if (!transporte) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    transporte.nomeDoEstoque = nomeDoEstoque !== undefined ? nomeDoEstoque : transporte.nomeDoEstoque;
    transporte.produto = produto !== undefined ? produto : transporte.produto;
    transporte.localizacao = localizacao !== undefined ? localizacao : transporte.localizacao;
    transporte.valorDoTransporte = valorDoTransporte !== undefined ? valorDoTransporte : transporte.valorDoTransporte;
    transporte.cnpj = cnpj !== undefined ? cnpj : transporte.cnpj;

    res.status(200).json(transporte);
});

app.delete('/api/transporte/:id', (req, res) => {
    const { id } = req.params;

    const index = transportes.findIndex(transp => transp.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Transporte não localizado' });
    }

   transportes.splice(index, 1);

    res.status(200).json();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


