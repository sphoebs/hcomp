// server/app.js
const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false,
    }
});
//console.log(process.env);
pool.query('SELECT * FROM user', (err, res) => {
    pool.end();
    if(err) return console.error("Error: "+err);
    console.log("Result: "+res.rows);
});


module.exports = app;
