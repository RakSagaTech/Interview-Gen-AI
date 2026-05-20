const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');



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
  }, process.env.JWT_SECRET, {expiresIn: '1d'})

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
  }, process.env.JWT_SECRET, {expiresIn: '1d'})

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


module.exports = {registerUserController, loginUserController}