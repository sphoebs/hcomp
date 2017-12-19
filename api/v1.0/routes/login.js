module.exports = app => {
    /**
     * @swagger
     * definitions:
     *   users:
     *     properties:
     *       id:
     *         type: string
     *       Facebook_ID:
     *         type: string
     *       Google_ID:
     *         type: string      
     *       email:
     *           type: string
     *       is_deleted:
     *         type: boolean
     *         default: false
     *       additional_data:
     *         type: json
     *       writer:
     *         type: boolean
     *         default: false    
     *       
     */
  
    /**
     * @swagger
     * /api/v1/auth/loginAsWriter/facebook:
     *   get:
     *     tags:
     *       - Users
     *     description: Login with Facebook
     *     produces:
     *       - application/json             
     *     responses:
     *       200:
     *         description: return a Token with user informations and Edit user's writer as true
     *         schema:
     *           $ref: '#/definitions/users'
     */
    app.get('/api/v1/auth/loginAsWriter/facebook', (req, res) => {   
    });
  
      /**
     * @swagger
     * /api/v1/auth/loginAsWriter/google:
     *   get:
     *     tags:
     *       - Users
     *     description: Login with Google
     *     produces:
     *       - application/json             
     *     responses:
     *       200:
     *         description: return a Token with user informations and Edit user's writer as true
     *         schema:
     *           $ref: '#/definitions/users'
     */
    app.get('/api/v1/auth/loginAsWriter/google', (req, res) => {   
    });

    /**
     * @swagger
     * /api/v1/auth/loginAsConsumer/facebook:
     *   get:
     *     tags:
     *       - Users
     *     description: Login with Facebook
     *     produces:
     *       - application/json             
     *     responses:
     *       200:
     *         description: return a Token with user informations. If user's writer is true change in false
     *         schema:
     *           $ref: '#/definitions/users'
     */
    app.get('/api/v1/auth/loginAsConsumer/facebook', (req, res) => {   
    });
  
      /**
     * @swagger
     * /api/v1/auth/loginAsConsumer/google:
     *   get:
     *     tags:
     *       - Users
     *     description: Login with Google
     *     produces:
     *       - application/json             
     *     responses:
     *       200:
     *         description: return a Token with user informations. If user's writer is true change in false
     *         schema:
     *           $ref: '#/definitions/users'
     */
    app.get('/api/v1/auth/loginAsConsumer/google', (req, res) => {   
    });
    
  };
  