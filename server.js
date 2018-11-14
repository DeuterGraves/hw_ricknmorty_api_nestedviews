const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.static('client/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/api/characters', (req, res) => {
  const url = 'https://rickandmortyapi.com/api/character/';

  fetch(url)
    .then(jsonData => jsonData.json())
    .then(data => res.json(data));
});

app.listen(3000, function () {
  console.log(`App running on port ${ this.address().port }`);
});
