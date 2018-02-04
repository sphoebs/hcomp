const controller = require('../controllers').runs;
const {ensureAuthorization,ensureAuthorizationCreator} = require('../Utility/Utility');
module.exports = app => {
   
    app.post("/tasks/runs", ensureAuthorizationCreator,  (req,res) => {        
        controller.create(req,res);
    });      

    app.get("/tasks/runs", ensureAuthorizationCreator, (req,res) => {        
        controller.readAll(req,res);
    });  

    app.get("/tasks/runs/:id", ensureAuthorizationCreator, (req,res) => {
        controller.readOne(req,res);
    });  

    app.put("/tasks/runs/:id", ensureAuthorizationCreator, (req,res) => {
        controller.update(req,res);
    });  

    app.delete("/tasks/runs/:id", ensureAuthorizationCreator, (req,res) => {
        controller.delete(req,res);
    });  
    
    app.get("/tasks/runs/recentRuns/:id", ensureAuthorizationCreator, (req,res) => {
        controller.recentRuns(req,res);
    });

    app.patch('/tasks/runs', ensureAuthorizationCreator, (req,res) => {
        controller.deletePhotos(req,res);
    })

};