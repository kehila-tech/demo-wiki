const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

const port = 4000;

const db = new sqlite3.Database('./wiki.db');

app.get('/api/hello', async (req, res) => {
  res.send('שלום עולם');
})

app.get("/api/page/get/:id", async (req, res) => {
  db.all(
    "SELECT content FROM pages WHERE id = ?",
    req.params.id,
    (err, rows) => {
      if (err || rows.length == 0) {
        res.send("עמוד לא נמצא");
      } else {
        res.send(rows[0].content);
      }
    }
  );
});

app.post("/api/page/set/:id", async (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  console.log(`Setting value of ${id} to ${content}`);
  console.log(req.body);
  db.run(
    "INSERT OR REPLACE INTO pages (id, content) VALUES (?, ?)",
    id,
    content
  );
  res.send("נשמר");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
