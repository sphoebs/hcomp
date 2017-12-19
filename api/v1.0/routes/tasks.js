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

  /**
   * @swagger
   * /api/v1/recentTasks/{id}:
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
  app.get('/api/v1/recentTasks/:id', (req, res) => {   
  });

  /**
   * @swagger
   * /api/v1/tasksbycategory/{id}:
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
  app.get('/api/v1/tasksbycategory/:id', (req, res) => {   
  });

  /**
   * @swagger
   * /api/v1/categories:
   *   get:
   *     tags:
   *       - Tasks
   *     description: Returns all categories.                    
   *     produces:
   *       - application/json                
   *     responses:
   *       200:
   *         description: An array of Categories
   *         schema:
   *           $ref: '#/definitions/tasks'
   */
  app.get('/api/v1/categories', (req, res) => {   
  });


   /**
   * @swagger
   * /api/v1/writerhistory/{id}:
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
  app.get('/api/v1/writerhistory/:id', (req, res) => {   
  });


    /**
   * @swagger
   * /api/v1/writerRecentTasks/{id}:
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
  app.get('/api/v1/writerRecentTasks/:id', (req, res) => {   
  });
  

};
