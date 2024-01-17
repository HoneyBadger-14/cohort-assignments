const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let requestCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

//Application level middleware
//Handles all requests
//These must be placed above the endpoints 

// app.use((req, res, next) => {
//   requestCount += 1;
//   next();
// });

// //Handles all the methods of request to this path [GET, PUT, POST]
// app.use('/user', (req, res, next) => {
//   console.log('Request type:', req.method);
//   next();
// });

// //Handles GET requests
// app.get('/user', (req, res, next) => {
//   console.log('Specifically GET middleware');
//   next();
// });

// app.get('/requestCount', (req, res, next) => {
//   console.log('Specifically requestCount middleware with app.get');
//   next();
// });

//Declaring the function array of middlewares within the handler 
function incrementCount(req, res, next) {
  requestCount += 1;
  console.log('Incrementing the count in middleware');
  next();
};
const middleStuff = [incrementCount];

app.get('/user', middleStuff, function (req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', middleStuff, function (req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', middleStuff, function (req, res) {
  res.status(200).json({ requestCount });
});

module.exports = app;