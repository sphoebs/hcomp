const controller = require('../controllers').runtypes;
const {ensureAuthorization, ensureAuthorizationCreator} = require('../Utility/Utility');
module.exports = app => {

    app.post("/runtypes", (req,res)=> {
        controller.create(req,res);
    })

    app.get("/runtypes" , (req,res)=> {
        controller.readAll(req,res);
    })

    app.get("/runtypes/:id" , (req,res)=> {
        controller.readOne(req,res);
    })

    app.put("/runtypes/:id" , (req,res)=> {
        controller.update(req,res);
    })

    app.delete("/runtypes",(req,res)=> {
        controller.delete(req,res);
    })
};