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
  const spinUseCase = ServiceLocator.get('SpinGameUseCase');
  const betAmount = req.body.bet || 100; 
  const { balance, result } = spinUseCase.execute(betAmount);
  res.json({ balance, result }); 
});

app.listen(5000, () => console.log('Server running on port 5000'));
