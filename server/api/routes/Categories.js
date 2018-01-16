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
    app.get("/categories", (req,res)=> {
        
    })
};