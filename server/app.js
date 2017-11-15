// server/app.js
const express = require('express');
const path = require('path');
const pg = require('pg');
const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

let pool = new pg.Pool();
console.log(process.env.DATABASE_URL);
pool.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM user', function(err, result) {
        done();
        if(err) return console.error("Error: "+err);
        console.log("Result: "+result.rows);
    });
});


module.exports = app;
