const controller = require('../controllers').runtypes;
const {ensureAuthorization, ensureAuthorizationCreator} = require('../Utility/Utility');
module.exports = app => {
  
    app.post("/runtypes", (req,res)=> {
        controller.create(req,res);
    })

    app.get("/runtypes", ensureAuthorization , (req,res)=> {
        controller.readAll(req,res);
    })

    app.get("/runtypes/:id", ensureAuthorization , (req,res)=> {
        controller.readOne(req,res);
    })

    app.put("/runtypes/:id", ensureAuthorization , (req,res)=> {
        controller.update(req,res);
    })

    app.delete("/runtypes", ensureAuthorization,(req,res)=> {
        controller.delete(req,res);
    })
};