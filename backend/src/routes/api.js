const express = require('express')

const ymaneRouter= require('./ymane.route')

const api = express();

api.use('/ymanebot', ymaneRouter);


module.exports = api;
 