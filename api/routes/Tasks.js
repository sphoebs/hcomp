const controller = require('../controllers').tasks;
const {ensureAuthorization} = require('../Security/SourceOfAuth');
module.exports = app => {
   
    app.post("/tasks", ensureAuthorization, (req,res) => {
        controller.create(req,res);
    });
    app.get("/tasks/:id", ensureAuthorization , (req,res) => {
        controller.readOne(req,res);
    });
    app.put("/tasks/:id", ensureAuthorization, (req,res) => {
        controller.update(req,res);
    });
    app.delete("/tasks/:id", ensureAuthorization, (req,res)=> {
        controller.delete(req,res);
    });   
    app.get("/tasks/creatorRecentTasks:id", ensureAuthorization, (req,res) => {
        controller.creatorRecentTasks(req,res);
    }); 
   
};