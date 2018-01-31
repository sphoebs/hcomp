const controller = require('../controllers').assignments;
const {ensureAuthorization, ensureAuthorizationCreator} = require('../Utility/Utility');
module.exports = app => {
   
    app.post("/tasks/runs", ensureAuthorization,  (req,res) => {
        controller.create(req,res);
    });      

    app.get("/tasks/runs", (req,res) => {
        
        controller.readAll(req,res);
    });  

    app.get("/tasks/runs/:id", ensureAuthorization, (req,res) => {
        controller.readOne(req,res);
    });  

    app.put("/tasks/runs/:id", ensureAuthorization, (req,res) => {
        controller.update(req,res);
    });  

    app.delete("/tasks/runs/:id", ensureAuthorization, (req,res) => {
        controller.delete(req,res);
    });  
    
    app.get("/tasks/runs/recentRuns/:id", ensureAuthorizationCreator, (req,res) => {
        controller.recentRuns(req,res);
    });

};