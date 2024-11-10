import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

app.get('/proxy/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const response = await axios.get(`https://investidor10.com.br/acoes/${ticker}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Erro ao acessar dados');
  }
});

app.get('/api/acoes', async (req, res) => {
  try {
    const response = await axios.get(`https://investidor10.com.br/acoes/?page=1`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Erro ao acessar dados');
  }
});

app.listen(3001, () => {
  console.log('Servidor proxy rodando na porta 3001');
});