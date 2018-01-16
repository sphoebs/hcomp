const controller = require('../controllers').assignments;

module.exports = app => {
    /**
   * @swagger
   * definitions:
   *   assignments:
   *     properties:
   *       id:
   *         type: integer
   *       user_id:
   *         type: string
   *       task_id:
   *         type: integer
   *       time_started:
   *         type: date
   *       time_completed:
   *           type: date
   *       is_in_progress:
   *         type: boolean
   *         default: false
   *       additional_data:
   *         type: json   
   */
   
   /**
   * @swagger
   * /api/consumerhistory/{id}:
   *   get:
   *     tags:
   *       - assignments
   *     description: Returns all assignments done by a given user id.                    
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
   *         description: An array of assignmentss and Users
   *         schema:
   *           $ref: '#/definitions/assignments'
   */
    app.get("/consumerhistory/:id", (req,res) => {

    });


    /**
   * @swagger
   * /api/guestmotivational:
   *   get:
   *     tags:
   *       - assignments
   *     description: Returns the most assignments done by consumer users.
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
   *         description: An array of assignments and Users
   *         schema:
   *           $ref: '#/definitions/assignments'
   */
    app.get("/guestmotivational", (req,res) => {

    });

    /**
   * @swagger
   * /api/writermotivational:
   *   get:
   *     tags:
   *       - assignments
   *     description: Returns the most assignments done by consumer users regarding your tasks.
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
   *         description: An array of assignments and Users
   *         schema:
   *           $ref: '#/definitions/assignments'
   */
    app.get("/writermotivational/:id", (req,res) => {

    });

    /**
   * @swagger
   * /api/consumermotivational:
   *   get:
   *     tags:
   *       - assignments
   *     description: Returns the most assignments done by your friends.
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
   *         description: An array of assignments and Users
   *         schema:
   *           $ref: '#/definitions/assignments'
   */
    app.get("/consumermotivational/:id", (req,res) => {

    });

    /**
   * @swagger
   * /api/assignments/:id:
   *   post:
   *     tags:
   *       - assignments
   *     description: Create ad assignments.
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
   *         description: assignments created
   *         schema:
   *           $ref: '#/definitions/assignments'
   */
    app.post("/assignments", (req,res) => {

    });
};