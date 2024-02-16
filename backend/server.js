const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const port = 4000;

app.get('/api/hello', async (req, res) => {
  res.send('שלום עולם');
})

const pages = new Map();
pages.set('עמוד', 'זהו תוכן של עמוד');
pages.set('ראשי', 'זהו העמוד הראשי');

app.get('/api/page/get/:id', async (req, res) => {
  const content = pages.get(req.params.id);
  if (content) {
    res.send(content);
  } else {
    res.send("עמוד לא נמצא");
  }
})

app.post('/api/page/set/:id', async (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  console.log(`Setting value of ${id} to ${content}`);
  console.log(req.body);
  pages.set(id, content);
  res.send("נשמר");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
