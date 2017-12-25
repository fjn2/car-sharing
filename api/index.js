const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')


const filePersistName = 'db.json';
const persistToDiskInterval = 10000;
const db = {
  use: [],
  charge: []
};
const app = express();

const port = 3050;

app.use(bodyParser.json())

app.get('/use', (req, res, next) => {
  console.log('GET /use');
  res.send(db.use);
});
app.post('/use', (req, res, next) => {
  console.log('POST /use with body:', req.body);
  db.use.push(req.body)
  res.send({
    status: 'ok'
  });
});

app.get('/charge', (req, res, next) => {
  console.log('GET /charge');
  res.send(db.charge);
});
app.post('/charge', (req, res, next) => {
  console.log('POST /charge with body:', req.body);
  db.charge.push(req.body)
  res.send({
    status: 'ok'
  });
});

app.listen(port, function() {
  console.log('listening on ' + port);
})

function readInit() {
  const content = fs.readFileSync(filePersistName);
  if (content.length > 0) {
    Object.assign(db, JSON.parse(content));
  }
}

function persistToDisk() {
  console.log('persistToDisk');
  fs.writeFileSync(filePersistName, JSON.stringify(db));
}

setInterval(persistToDisk, persistToDiskInterval);