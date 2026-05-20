const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const tokenBlacklistModel = require('../models/blacklist.model');


/**
 * @name registerUserController
 * @description Register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res){
  const {email, username, password} = req.body

  if(!email || !username || !password){
    return res.status(400).json({
      message: "Please provide username, email and password"
    })
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      {email},
      {username}
    ]
  })

  if(isUserAlreadyExists){
    return res.status(400).json({
      message: "Account with the same email or username already exists"
    })
  }

  const hashPassword = await bcrypt.hash(password, 10);
  
  const user = await userModel.create({
    email,
    username,
    password: hashPassword
  })
  
  const token = jwt.sign({
    id: user._id,
    username: user.username
  }, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})

  res.cookie('token', token)
  res.status(201).json({
    message: "User registered successfully",
    user:{
      id: user._id,
      email: user.email,
      username: user.username
    }
  })
}

/**
 * @name loginUserController 
 * @description Login a new user, expects username and password in the request body
 * @access Public
 */
async function loginUserController(req, res){
  const {username, password} = req.body;

  const user = await userModel.findOne({username})

  if(!user){
    return res.status(400).json({
      message: "Invalid username or password"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({
      message: "Invalid username or password"
    })
  }
  const token = jwt.sign({
    id: user._id,
    username: user.username
  }, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})

  res.cookie('token', token)
  res.status(201).json({
    message: "User registered successfully",
    user:{
      id: user._id,
      email: user.email,
      username: user.username
    }
  })
}

/**
 * @name logoutUserController
 * @description Logout a user, clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutUserController(req, res){
  const token = req.cookies.token;

  if(token){
    await tokenBlacklistModel.create({token})
  }

  res.clearCookie('token');
  res.status(200).json({
    message: "User logged out successfully"
  })
}


/**
 * @name getMeUserController
 * @description Get the current logged in user details
 * @access Private
 */
async function getMeUserController(req, res){
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      username: user.username
    }
  })
}


module.exports = {registerUserController, loginUserController, logoutUserController, getMeUserController}