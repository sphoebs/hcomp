// libraries
const express = require('express');
const path = require('path');
const session = require('express-session');
const swaggerJSDoc = require('swagger-jsdoc');
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

// Swagger options: metadata and the path were the routes are defined
const options = {
    swaggerDefinition: {
      info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Add Swagger documentation to the hsc API'
      },
      host: 'localhost:' + port,
  
  
      basePath: '/'
    },
    apis: ['api/routes/*.js']
  };



app.use(session({
    secret: 'lol',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*24}
}));


//SERVER CREATION
const server = http.createServer(app);
server.listen(port, () => {
  console.log("Running on port " + port);
});


//SWAGGER SETUP
const swagSpec = swaggerJSDoc(options);

app.use(bodyParser.json());

// Serves the whole swagger directory as static on the route /swagger
app.use('/swagger', express.static(path.join(__dirname + '/swagger')));

// Swagger JSON route
app.get('/api/swagger', (req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.send(swagSpec);
});

// Adding API routes

require('./api/routes/SocialLogin')(app);
require('./api/routes/Assignments')(app);
require('./api/routes/Categories')(app);
require('./api/routes/Tasks')(app);
require('./api/routes/Users')(app);

module.exports = app;
