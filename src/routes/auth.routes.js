const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/auth.controller');



/**
 * @roue POST /api/auth/register 
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController);


/**
 * @roue POST /api/auth/login 
 * @description Login a new user
 * @access Public
 */
authRouter.post('/login', authController.loginUserController);



module.exports = authRouter;