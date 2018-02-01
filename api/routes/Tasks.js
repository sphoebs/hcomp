const controller = require('../controllers').tasks;
const {ensureAuthorization, ensureAuthorizationCreator} = require('../Utility/Utility');
module.exports = app => {
   
    app.post("/tasks", (req,res) => {
        console.log("lol sono su post");
        controller.create(req,res);
    });
    app.get("/tasks", ensureAuthorizationCreator, (req,res) => {
        controller.readAll(req,res);
    })
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