const controller = require('../controllers').tasks;
const {ensureAuthorization, ensureAuthorizationCreator} = require('../Utility/Utility');
module.exports = app => {
   
    app.post("/tasks", (req,res) => {       
        controller.create(req,res);
    });
    app.get("/tasks", (req,res) => {
        controller.readAll(req,res);
    })
    app.get("/tasks/:id" , (req,res) => {
        controller.readOne(req,res);
    });
    app.put("/tasks/:id", (req,res) => {
        controller.update(req,res);
    });
    app.delete("/tasks/:id", (req,res)=> {
        controller.delete(req,res);
    });   
    app.get("/tasks/creatorRecentTasks:id", (req,res) => {
        controller.creatorRecentTasks(req,res);
    });  
   
};