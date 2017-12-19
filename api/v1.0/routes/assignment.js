module.exports = app => {
 /**
   * @swagger
   * definitions:
   *   assignment:
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
   * /api/v1/consumerhistory/{id}:
   *   get:
   *     tags:
   *       - Assignment
   *     description: Returns all assignment done by a given user id.                    
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
   *         description: An array of Assignments and Users
   *         schema:
   *           $ref: '#/definitions/assignment'
   */
  app.get('/api/v1/consumerhistory/:id', (req, res) => {   
});

  /**
   * @swagger
   * /api/v1/guestmotivational:
   *   get:
   *     tags:
   *       - Assignment
   *     description: Returns the most assignment done by consumer users.
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
   *         description: An array of Assignment and Users
   *         schema:
   *           $ref: '#/definitions/assignment'
   */
  app.get('/api/v1/guestmotivational', (req, res) => {   
});

  /**
   * @swagger
   * /api/v1/writermotivational:
   *   get:
   *     tags:
   *       - Assignment
   *     description: Returns the most assignment done by consumer users regarding your tasks.
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
   *         description: An array of Assignment and Users
   *         schema:
   *           $ref: '#/definitions/assignment'
   */
  app.get('/api/v1/writermotivational', (req, res) => {   
});

  /**
   * @swagger
   * /api/v1/consumermotivational:
   *   get:
   *     tags:
   *       - Assignment
   *     description: Returns the most assignment done by your friends.
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
   *         description: An array of Assignment and Users
   *         schema:
   *           $ref: '#/definitions/assignment'
   */
  app.get('/api/v1/consumermotivational', (req, res) => {   
});
}