const controller = require("../controllers").users;


module.exports = app => {
  /**
   * @swagger
   * definitions:
   *   users:
   *      properties:
   *         id:
   *            type: string
   *         Facebook_ID:
   *            type: string
   *         Google_ID:
   *            type: string      
   *         email:
   *            type: string
   *         is_deleted:
   *            type: boolean
   *            default: false
   *         additional_data:
   *            type: object
   *         writer:
   *            type: boolean
   *            default: false
   */  

   app.post('/auth/login' , (req,res) => {
     controller.create(req,res);
   })
   app.get('/users', (req,res) => {
     controller.readAll(req,res);
   })
   app.get('/users/:id', (req,res) => {
     controller.readOne(req,res);
   });
};
