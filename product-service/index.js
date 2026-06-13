require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3002;
const SERVICE_NAME = process.env.SERVICE_NAME || 'product-service';

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: SERVICE_NAME });
});

app.get('/products', (req, res) => {
  res.json({
    service: SERVICE_NAME,
    data: [
      { id: 1, name: 'Laptop Pro',   price: 1299 },
      { id: 2, name: 'Souris sans fil', price: 49 },
    ]
  });
});

app.listen(PORT, () => {
  console.log(`${SERVICE_NAME} running on port ${PORT}`);
});