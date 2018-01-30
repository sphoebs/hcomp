const controller = require('../controllers').tasks;
const {ensureAuthorization, ensureAuthorizationCreator} = require('../Security/SourceOfAuth');
module.exports = app => {
   
    app.post("/tasks", ensureAuthorizationCreator, (req,res) => {
        controller.create(req,res);
    });
    app.get("/tasks/:id", ensureAuthorizationCreator , (req,res) => {
        controller.readOne(req,res);
    });
    app.put("/tasks/:id", ensureAuthorizationCreator, (req,res) => {
        controller.update(req,res);
    });
    app.delete("/tasks/:id", ensureAuthorizationCreator, (req,res)=> {
        controller.delete(req,res);
    });   
    app.get("/tasks/creatorRecentTasks:id", ensureAuthorizationCreator, (req,res) => {
        controller.creatorRecentTasks(req,res);
    }); 
   
};