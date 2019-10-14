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
      const result = await client.query('SELECT * FROM tokimon');
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
  var name = req.body.nam;
  var weight = req.body.weight;
  var height = req.body.height;
  var fly = req.body.fly;
  var fight = req.body.fight;
  var fire = req.body.fire;
  var water = req.body.water;
  var electric = req.body.electric;
  var ice = req.body.ice;
  var total = fly + fight + fire + water + electric + ice;
  var trainer = req.body.trainer;
  res.send(`${name} ${weight} ${height} ${fly} ${fight} ${fire} ${water} ${electric} ${ice} ${total} ${trainer}`);
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
