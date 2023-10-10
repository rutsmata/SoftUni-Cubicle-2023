const bcrypt = require("bcrypt");

const jwt = require('../lib/jwt')
const User = require("../models/User");

const SECRET = '114881f5f61828c951b6491132b290eb2dd0256ae777941d38773ff66f30e015'

//create function that will create user data in db using the User model
exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
  //find user and check if exist
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Can not find username or password!");
  }

  //validate the client typed password vs the db hashed password
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error('Can not find username or password!')
  }

  //create token that will expire in 2 days
  const payload = {
    _id: user._id,
    username: user.username,
  }

  const token = await jwt.sign(payload, SECRET, {expiresIn: "2d"})

  //return token
  return token
};
