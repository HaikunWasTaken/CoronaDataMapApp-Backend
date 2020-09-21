const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const engine = require('consolidate');
const bodyParser = require('body-parser');
const getPointsOfInterest = require(path.join(__dirname, '/src/scripts/getPointsOfInterest.js'));
const port = process.env.PORT || 3000;

const app = express();

/*app.engine('html', engine.mustache);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');*/


app.use('/scripts', express.static(__dirname + '/src/scripts'));
//app.use('/css', express.static(__dirname + '/src/css'));

app.use(cors());
app.use(morgan('common'));
app.use(bodyParser.json());

//Routes
app.post('/basic', async function(req, res) {
  const response = await getPointsOfInterest.getBasicData(req.body);
  res.send(response);
});

app.post('/premium', async function(req, res) {
  const response = await getPointsOfInterest.getPremiumData(req.body);
  res.send(response);
});

app.post('/country', async function(req, res) {
  const response = await getPointsOfInterest.getPremiumCountryData(req.body);
  res.send(response);
});

app.post('/search', async function(req, res) {
  const response = await getPointsOfInterest.getSearchResult(req.body);
  res.send(response);
});

app.use('/', function (req, res) {
  //res.render(path.join(__dirname, '/src/views/index.html'));
  res.status(200).send('Succesful!')
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}/`);
});
