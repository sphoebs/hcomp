

/*module.exports = app => {
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
     * /api/v1/auth/logout/facebook:
     *   delete:
     *     tags:
     *       - Users
     *     description: Logout from Facebook session
     *     produces:
     *       - application/json                
     *     responses:
     *       200:
     *         description: Logout succeded
     *         schema:
     *           $ref: '#/definitions/users'
     */
    app.delete('/api/v1/auth/logout/facebook', (req, res) => {   
    });
  
      /**
     * @swagger
     * /api/v1/auth/logout/google:
     *   delete:
     *     tags:
     *       - Users
     *     description: Logout from Google session
     *     produces:
     *       - application/json                
     *     responses:
     *       200:
     *         description: Logout succeded
     *         schema:
     *           $ref: '#/definitions/users'
     */
    app.delete('/api/v1/auth/logout/google', (req, res) => {   
    });
  
    
}