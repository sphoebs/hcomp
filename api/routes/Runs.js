const controller = require('../controllers').assignments;

module.exports = app => {
   
    app.post("/tasks/runs", (req,res) => {
        controller.create(req,res);
    });      

    app.get("/tasks/runs", (req,res) => {
        controller.readAll(req,res);
    });  

    app.get("/tasks/runs/:id", (req,res) => {
        controller.readOne(req,res);
    });  

    app.put("/tasks/runs/:id", (req,res) => {
        controller.update(req,res);
    });  

    app.delete("/tasks/runs/:id", (req,res) => {
        controller.delete(req,res);
    });  
    
    app.get("/tasks/runs/recentRuns/:id", (req,res) => {
        controller.recentRuns(req,res);
    });

};