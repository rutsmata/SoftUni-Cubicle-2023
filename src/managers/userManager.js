const bcrypt = require("bcrypt");

const User = require("../models/User");

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

  //return user
  return user
};
