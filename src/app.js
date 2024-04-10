/**
 * Main App
 * Also calls Subpaths (Routers)
 */

const express = require('express'); 
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

require('dotenv').config();

// import routes
const highscore = require('./routes/highscore.router');
const test = require('./routes/test.router');

const app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// USE STATIC FILES (CSS, JS, IMAGES)
app.use(express.static(path.join(__dirname, '/public')));

// an http request logger middleware
app.use(morgan('dev'));

//helps secure Express.js apps by setting various HTTP headers
//https://github.com/helmetjs/helmet
app.use(helmet());

//For parsing application/json --> recognizing incoming request objects as json objects
app.use(express.json());

//For parsing application/x-www-form-urlencoded --> recognizing incoming request objects as strings or arrays
app.use(express.urlencoded({ extended: true }));

//import the routes
app.use(highscore);
app.use(test);

// redirect error, if endpoint doesn't exist
app.get('*', (req, res) => {
  res.status(404).send('Page not found.');
});

// error middleware --> list after rest api routes, so endpoints can be delegated to this error handling middleware
// if no statusCode property is available at the error object --> set status code to 500
app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  return res
    .status(error.statusCode)
    .json({ error: error.toString() });
});

// when local listen to port 5000 else listen to the port heroku provides
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT} Environment: ${process.env.NODE_ENV}`)
});

module.exports = app;