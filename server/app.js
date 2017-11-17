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

app.post('/userLogin', (req, res)=>{
    console.log(req);
})

// pool.query('SELECT * FROM public.user', (err, res) => {
//     pool.end();
//     if(err) return console.error("Error: "+err);
//     //Result access through res.rows[0].ID
// });

module.exports = app;
