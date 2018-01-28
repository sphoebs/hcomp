// libraries
const express = require('express');
const path = require('path');
const session = require('express-session');
const util = require('util');
const http = require('http');
const bodyParser = require('body-parser');
//const Sequelize = require ('sequelize');


//APP PORT AND SERVER CREATION
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

/*const sequelize = new Sequelize(process.env.DATABASE_URL);
sequelize.authenticate().then(() => {
  console.log('Connection to DB has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
const users= sequelize.import('./api/migrations/20180117213418-users.js');
const categories= sequelize.import('./api/migrations/20180117213418-categories.js');
const tasks= sequelize.import('./api/migrations/20180117213418-tasks.js');
const assignments= sequelize.import('./api/migrations/20180117213418-assignments.js');*/


app.use(session({
    secret: 'lol',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*24}
}));

app.use((req, res, next) => {
  // TODO: change this to website(react) dom when in production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true); 
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
//SERVER CREATION
const server = http.createServer(app);
server.listen(port, () => {
  console.log("Running on port " + port);
});

app.use(bodyParser.json());

// Adding API routes

require('./api/routes/SocialLogin')(app);
require('./api/routes/Assignments')(app);
require('./api/routes/TaskTypes')(app);
require('./api/routes/Tasks')(app);
require('./api/routes/Users')(app);

module.exports = app;
