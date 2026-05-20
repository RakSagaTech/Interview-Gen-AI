const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');



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

/**
 * @roue POST /api/auth/logout 
 * @description Logout a user, clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get('/logout', authController.logoutUserController);


/**
 * @roue GET /api/auth/get-me 
 * @description Get the current logged in user details  
 * @access Private
 */
authRouter.get('get-me',authMiddleware.authUser,authController.getMeUserController);


module.exports = authRouter;