const express = require('express');
const cors = require('cors');
const ServiceLocator = require('./core/ServiceLocator');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/state', (req, res) => {
  const repo = ServiceLocator.get('GameRepository');
  res.json({ balance: repo.getBalance(), history: repo.getHistory() });
});

app.post('/api/spin', (req, res) => {
  console.log("Spin endpoint called from main branch");
  const spinUseCase = ServiceLocator.get('SpinGameUseCase');
  const result = spinUseCase.execute();
  res.json(result);
});

app.listen(5000, () => console.log('Server running on port 5000'));
