const controller = require('../controllers').categories;

module.exports = app => {
    /**
   * @swagger
   * definitions:
   *   categories:
   *     properties:
   *       name:
   *         type: string
   *       id:
   *         type: integer   
   */

   /**
   * @swagger
   * /api/categories:
   *   get:
   *     tags:
   *       - Categories
   *     description: Returns all categories.                    
   *     produces:
   *       - application/json                
   *     responses:
   *       200:
   *         description: An array of Categories
   *         schema:
   *           $ref: '#/definitions/categories'
   */
    app.get("/categories", (req,res)=> {
        
    })
};