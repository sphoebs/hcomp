const Crud = require("./Crud");
const runtypes = require("../models").runtypes;

class RunTypes extends Crud{
    constructor(){
        super(runtypes);
        this.lastUpdated;
    }

    create(req,res){
        console.log(req.body);
        return this.model
        .create(req.body)
        .then(data => res.send({message :'RunType Created'}))
        .catch(error =>
             res.status(400).send(error))
    }
    readAll(req,res){
        const results = [];
        // Get a Postgres client from the connection pool
        pg.connect(connectionString, (err, client, done) => {
          // Handle connection errors
          if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
          }
          const query = client.query('SELECT * FROM runtypes');
          query.on('row', (row) => {
            results.push(row);
          });
          // After all data is returned, close connection and return results
          query.on('end', () => {
            done();
            return res.json(results);
          });
        });
        return this.model
        .findAll()
        .then(data => res.send(JSON.stringify(data)))
        .catch(error => res.status(400).send(error))
    }
}

module.exports = RunTypes;