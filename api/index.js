const express = require('express');
const cors = require('cors');
const app = express();

let lastRequest = null;

app.use(express.json()); // Middleware para parsear JSON
app.use(cors());

app.get('/', (req, res) => {
    res.send("lastRequest");
});

// Rota para salvar o request
app.post('/save-request', (req, res) => {
  lastRequest = req.body;
  res.send({
    "type": "CREATE_CUSTOMER_SERVICE",
    "departmentUUID": "08bd4c24-f360-4b75-9f6b-7a409ca2d53a",
    "text": "Redirecionando para atendimento.",
    "callback": {
      "endpoint": "https://api-wheat-theta.vercel.app/get-last-request",
      "data": {
      "example": "Additional information"
      }
      }
    });
});

// Rota para retornar o último request salvo
app.get('/get-last-request', (req, res) => {
  if (lastRequest) {
    res.send(lastRequest);
  } else {
    res.send({ message: 'Nenhum request salvo.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
