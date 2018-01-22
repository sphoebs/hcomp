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

   /**
   * @swagger
   * /api/recentTasks/:id:
   *   get:
   *     tags:
   *       - Tasks
   *     description: Returns the most recent tasks. 2 by default. Also check if there are any friends 
   *                  who have made them. If so, users also returned. If id is null just return the most
   *                  recent tasks
   *     produces:
   *       - application/json
   *     parameters:
   *         - name: id
   *           description: User id 
   *           in: path         
   *           required: true
   *           type: integer            
   *     responses:
   *       200:
   *         description: An array of Tasks and An array of Users
   *         schema:
   *           $ref: '#/definitions/tasks'
   */
    app.get("/recentTasks/:id", (req,res) => {

    });

    /**
   * @swagger
   * /api/tasksbycategory/:id:
   *   get:
   *     tags:
   *       - Tasks
   *     description: Returns all tasks by given category id.                     
   *     produces:
   *       - application/json                
   *     responses:
   *       200:
   *         description: An array of Tasks
   *         schema:
   *           $ref: '#/definitions/tasks'
   */
    app.get("/tasksbycategory/:id", (req,res) => {

    });    

   /**
   * @swagger
   * /api/writerhistory/:id:
   *   get:
   *     tags:
   *       - Tasks
   *     description: Returns all tasks made by a given user id.                    
   *     produces:
   *       - application/json
   *     parameters:
   *         - name: id
   *           description: User id 
   *           in: path         
   *           required: true
   *           type: integer                
   *     responses:
   *       200:
   *         description: An array of Tasks
   *         schema:
   *           $ref: '#/definitions/tasks'
   */
    app.get("/writerhistory/:id", (req,res) => {

    });

   /**
   * @swagger
   * /api/writerRecentTasks/:id:
   *   get:
   *     tags:
   *       - Tasks
   *     description: Returns the most writer recent tasks. 2 by default.
   *     produces:
   *       - application/json
   *     parameters:
   *         - name: id
   *           description: User id 
   *           in: path         
   *           required: true
   *           type: integer            
   *     responses:
   *       200:
   *         description: An array of Tasks
   *         schema:
   *           $ref: '#/definitions/tasks'
   */
    app.get("/writerrecenttasks/:id", (req,res) => {

    });
};