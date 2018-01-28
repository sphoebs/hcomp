const controller = require('../controllers').tasks;

module.exports = app => {
    /**
   * @swagger
   * definitions:
   *   tasks:
   *     properties:
   *       name:
   *         type: string
   *       id:
   *         type: integer
   *       description:
   *         type: string
   *       category_id:
   *         type: integer
   *       owner:
   *           type: integer
   *       is_deleted:
   *         type: boolean
   *         default: false
   *       is_active:
   *         type: boolean
   *         default: false
   */

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