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
app.get('/dbview', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM tokimon');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/dbview', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
app.get('/cool', (req, res) => res.send(cool()));
app.get('/tokimon', (req,res) => { res.render('pages/tokimon')});
app.post('/input', (req, res) => {
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
  VALUES ('${name}', ${weight}, ${height}, ${fly}, ${fight}, ${fire}, ${water}, ${electric}, ${ice}, ${total}, '${trainer}')`), (error,result) => {
    if (error)
      res.end(error);
  })
  res.render('pages/dbview');
});
app.post('/delete', (req, res) => {
  var id = req.body.delete;
  pool.query(`DELETE FROM tokimon WHERE UID = ${id}`), (error,result) => {
    if (error)
      res.end(error);
  }
  res.render('pages/dbview');
});
app.post('/update', (req, res) => {
  var name = req.body.update;
  pool.query(`UPDATE tokimon SET name = '${name}'`), (error,result) => {
    if (error)
      res.end(error);
  }
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
