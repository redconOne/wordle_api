const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 8000;
let words = [];
fs.readFile('./words.json', (err, json) => {
  words = JSON.parse(json);
  words = words['words'];
});

app.use(cors());

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.get('/api/getWord', (request, response) => {
  const index = Math.floor(Math.random() * words.length);
  const solution = words[index];
  response.json(solution);
});

app.get('/api/isWord/:guess', (request, response) => {
  const userWord = request.params.guess.toLowerCase();
  if (words.includes(userWord)) response.send(true);
  else response.send(false);
});

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
