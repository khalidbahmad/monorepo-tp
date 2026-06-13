require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
const SERVICE_NAME = process.env.SERVICE_NAME || 'user-service';

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: SERVICE_NAME });
});

app.get('/users', (req, res) => {
  res.json({
    service: SERVICE_NAME,
    data: [
      { id: 1, name: 'Alice Dupont', email: 'alice@example.com' },
      { id: 2, name: 'Bob Martin',  email: 'bob@example.com'   },
    ]
  });
});

app.listen(PORT, () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`);
});