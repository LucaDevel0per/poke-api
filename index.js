const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Libera CORS para qualquer origem

// Rota para buscar Pokémon
app.get('/pokemon/:nome', async (req, res) => {
  const nome = req.params.nome.toLowerCase();

  try {
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    res.json(resposta.data);
  } catch (error) {
    res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
});

// Inicia o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
