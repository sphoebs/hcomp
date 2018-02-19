// libraries
const express = require('express');
const session = require('express-session');
const http = require('http');
const bodyParser = require('body-parser');
//const Sequelize = require ('sequelize');


//APP PORT AND SERVER CREATION
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.use((req, res, next) => {
  // TODO: change this to website(react) dom when in production
 res.setHeader('Access-Control-Allow-Origin', '*');
 //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 res.setHeader('Access-Control-Allow-Credentials', true);
 res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin , Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
//SERVER CREATION
const server = http.createServer(app);
server.listen(port, () => {
  console.log("Running on port " + port);
});

app.use(bodyParser({limit: '50mb'}));


// Adding API routes

require('./api/routes/Runs')(app);
require('./api/routes/Assignments')(app);
require('./api/routes/RunTypes')(app);
require('./api/routes/Tasks')(app);
require('./api/routes/Users')(app);

module.exports = app;
