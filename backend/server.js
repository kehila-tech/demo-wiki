const express = require('express');
const app = express();
const port = 4000;

app.get('/api/hello', async (req, res) => {
  res.send('שלום עולם');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
