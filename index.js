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
  var weight = parseInt(req.body.weight);
  var height = parseInt(req.body.height);
  var fly = parseInt(req.body.fly);
  var fight = parseInt(req.body.fight);
  var fire = parseInt(req.body.fire);
  var water = parseInt(req.body.water);
  var electric = parseInt(req.body.electric);
  var ice = parseInt(req.body.ice);
  var total = parseInt(fly) + parseInt(fight) + parseInt(fire) + parseInt(water) + parseInt(electric) + parseInt(ice);
  var trainer = req.body.trainer;
  pool.query(`INSERT INTO tokimon (name, weight, height, fly, fight, fire, water, electric, ice, total, trainer)
  VALUES ('${name}', ${weight}, ${height}, ${fly}, ${fight}, ${fire}, ${water}, ${electric}, ${ice}, ${total}, '${trainer}')`, (error,result) => {
    if (error)
      res.end(error);
  })
  var insrt =
  res.send(`${name} ${weight} ${height} ${fly} ${fight} ${fire} ${water} ${electric} ${ice} ${total} ${trainer}`);
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
