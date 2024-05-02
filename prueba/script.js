const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const upload = multer({ dest: 'uploads/' });
var info;
var bandera = 0;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });
  
db.run('CREATE TABLE IF NOT EXISTS users(username TEXT, password TEXT, email TEXT, photo TEXT)');
  
app.post('/login', (req, res) => {
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password], (err, row) => {
    if (err) {
      return console.log(err.message);
    }
    if (row) 
    {
    
      info = row;
      banera = 1;
      
      res.sendFile(path.join(__dirname, '../views/index.html'));

        } else {
      res.send('Invalid username or password.');
    }
  });
});

app.post('/register', upload.single('photo'), (req, res) => {
  db.run(`INSERT INTO users(username, password, email, photo) VALUES(?, ?, ?, ?)`, [req.body.username, req.body.password, req.body.email, req.file.path], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  res.send('User registered');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
});


module.exports = info;