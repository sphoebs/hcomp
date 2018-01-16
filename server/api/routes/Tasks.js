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
    app.post("/task", (req,res) => {

    });
    app.get("/task/:id", (req,res) => {

    });
    app.patch("/task/:id", (req,res) => {

    });
    app.delete("/task/:id", (req,res)=> {

    });
    app.post("task/complete", (req,res)=> {

    });
    app.get("/recentTasks/:id", (req,res) => {

    });
    app.get("/tasksbycategory/:id", (req,res) => {

    });    
    app.get("/writerhistory/:id", (req,res) => {

    });
    app.get("/writerrecenttasks/:id", (req,res) => {

    });
};