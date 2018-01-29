const controller = require('../controllers').assignments;

module.exports = app => {
   
    app.post("/tasks/runs/assignments", (req,res) => {
        controller.create(req,res);
    });      

    app.get("/tasks/runs/assignments", (req,res) => {
        controller.readAll(req,res);
    });  

    app.get("/tasks/runs/assignments/:id", (req,res) => {
        controller.readOne(req,res);
    });  

    app.put("/tasks/runs/assignments/:id", (req,res) => {
        controller.update(req,res);
    });  

    app.delete("/tasks/runs/assignments/:id", (req,res) => {
        controller.delete(req,res);
    });  
    app.get("/tasks/runs/assignments/workerhistory/:id", (req,res) => {
        controller.workerHistory(req,res);
    });
    app.get("/tasks/runs/assignments/guestmotivational", (req,res) => {
        controller.guestMotivational(req,res);
    });
    app.get("/tasks/runs/assignments/creatormotivational/:id", (req,res) => {
        controller.creatorMotivational(req,res);
    });
    app.get("/tasks/runs/assignments/workermotivational/:id", (req,res) => {
        controller.workerMotivational(req,res);
    });
};