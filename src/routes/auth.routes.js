const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/auth.controller');



/**
 * @roue POST /api/auth/register 
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController);



module.exports = authRouter;