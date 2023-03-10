const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require('uuid');
const notes = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/notes/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) =>
  res.json(notes)
);

app.post('/api/notes', (req, res) => {
    notes.push(req.body) 
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes)
  }
), 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));