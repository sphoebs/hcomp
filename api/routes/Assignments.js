const controller = require('../controllers').assignments;
const {ensureAuthorization, ensureAuthorizationCreator} = require('../Utility/Utility');
module.exports = app => {
   
    app.post("/tasks/runs/assignments", ensureAuthorization, (req,res) => {
        controller.create(req,res);
    });      

    app.get("/tasks/runs/assignments", ensureAuthorization,(req,res) => {
        controller.readAll(req,res);
    });  

    app.get("/tasks/runs/assignments/:id",  ensureAuthorization,(req,res) => {
        controller.readOne(req,res);
    });  

    app.put("/tasks/runs/assignments/:id",  ensureAuthorization,(req,res) => {
        controller.update(req,res);
    });  

    app.delete("/tasks/runs/assignments/:id",  ensureAuthorization,(req,res) => {
        controller.delete(req,res);
    });  
    app.get("/tasks/runs/assignments/workerhistory/:id", ensureAuthorization, (req,res) => {
        controller.workerHistory(req,res);
    });
    app.get("/tasks/runs/assignments/guestmotivational", (req,res) => {
        controller.guestMotivational(req,res);
    });
    app.get("/tasks/runs/assignments/creatormotivational/:id", ensureAuthorizationCreator, (req,res) => {
        controller.creatorMotivational(req,res);
    });
    app.get("/tasks/runs/assignments/workermotivational/:id", ensureAuthorization,(req,res) => {
        controller.workerMotivational(req,res);
    });
};