const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
   ssl: true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT trainer FROM tokimon');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
app.get('/cool', (req, res) => res.send(cool()));
app.get('/tokimon', (req,res) => { res.render('pages/tokimon')});
app.post('/inputs', (req, res) => {
  console.log('test');
  var name = req.body.nam;
  var val1 = req.body.fly;
  res.send(`Hello, ${name}. \n ${val1}`);
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
