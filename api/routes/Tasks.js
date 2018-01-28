const controller = require('../controllers').tasks;

module.exports = app => {
   
    app.post("/tasks", (req,res) => {
        controller.create(req,res);
    });
    app.get("/tasks/:id", (req,res) => {
        controller.readOne(req,res);
    });
    app.patch("/tasks/:id", (req,res) => {
        controller.update(req,res);
    });
    app.delete("/tasks/:id", (req,res)=> {
        controller.delete(req,res);
    });    
   
};