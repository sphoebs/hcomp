// libraries
const express = require('express');
const path = require('path');
const Sequelize = require ('sequelize');
const passport = require('passport');
const session = require('express-session');
const swaggerJSDoc = require('swagger-jsdoc');
const util = require('util');
const http = require('http');
const bodyParser = require('body-parser');

//APP PORT AND SERVER CREATION
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);


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
    apis: ['api/v1.0/routes/*.js']
  };
  

const utils = require('./utils.js');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE_URL);
require('./passport_settings.js')(passport, sequelize);

sequelize.authenticate().then(() => {
    console.log('Connection to DB has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});
const usersTable = sequelize.import('./models/users.js');

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*24}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
    cb(null, {id: user.ID, name: user.EMAIL});
});

passport.deserializeUser(function(user, cb) {
    usersTable.findById(user.id).then((user) =>{
        cb(null, user);
    });
});


app.get('/auth/login/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        //console.log(req.user);
        res.redirect('/auth/succeded/'+utils.generateToken(req.user));
    }
);
app.get('/auth/login/google',
    passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/login/google/return',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        //TODO: fix redirect with react running on different server
        res.redirect('/auth/succeded/'+utils.generateToken(req.user));
    }
);

//SERVER CREATION
const server = http.createServer(app);
server.listen(port, () => {
  console.log("Running on port " + port);
});

const swagSpec = swaggerJSDoc(options);

app.use(bodyParser.json());

// Serves the whole swagger directory as static on the route /swagger
app.use('/swagger', express.static(path.join(__dirname + '/swagger')));

// Swagger JSON route
app.get('/api/swagger', (req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.send(swagSpec);
});

module.exports = app;
