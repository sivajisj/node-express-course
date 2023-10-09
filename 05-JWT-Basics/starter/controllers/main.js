const badRequestError = require('../errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res, next) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new badRequestError('Please provide email and password'); // Assuming your CustomAPIError accepts a message and a status code
  }

  // Just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // Try to keep payload small for a better user experience
  // Just for demo, in production use a long, complex, and unguessable string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
   console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({ 
    msg: `Hello, ${req.user.username}`,
   secret: `Here is your authorized DataTransfer, your lucky number is ${luckyNumber}` 
  });

  //verify token
  
};

module.exports = { login, dashboard };
