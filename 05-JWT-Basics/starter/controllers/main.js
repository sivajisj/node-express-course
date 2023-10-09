const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res, next) => {
    const { username, password } = req.body;
    // mongoose validation
    // Joi
    // check in the controller
  
    if (!username || !password) {
      return next(new CustomAPIError('Please provide email and password', 400)); // Assuming your CustomAPIError accepts a message and a status code
    }
  
    // Just for demo, normally provided by DB!!!!
    const id = new Date().getDate();
  
    // Try to keep payload small for a better user experience
    // Just for demo, in production use a long, complex, and unguessable string value
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  
    res.status(200).json({ msg: 'user created',token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    throw new CustomAPIError("No token provided", 401)
  }
    const token = authHeader.split(' ')[1]
   
    
    //verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded);
      const luckyNumber = Math.floor(Math.random() * 100);
      res.status(200).json({ msg: `Hello, ${decoded.username}`, secret: `Here is your authorized DataTransfer, your lucky number is ${luckyNumber}` });
    } catch (error) {
      throw new CustomAPIError("Not Authorized to access this route", 401)
    }
};

module.exports = { login, dashboard };
