const controller = require('../controllers').runtypes;
const {ensureAuthorization} = require('../Security/SourceOfAuth');
module.exports = app => {
  
    app.post("/runtypes", ensureAuthorization, (req,res)=> {
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