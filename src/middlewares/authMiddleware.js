//middleware to validate the user token

const jwt = require("../lib/jwt");
const { SECRET } = require("../config/consts");

//check if token exist in the auth cookie.
exports.auth = async (req, res, next) => {
  // get the token from the cookie
  const token = req.cookies["auth"];

  //If no token, then user may go next, if yes token, we should validate it
  if (token) {
    try {
      //get the decoded token and validate - e.g if our SECRET is same, if token has expired...
      const user = await jwt.verify(token, SECRET);
        //record the user info which can be passed to the next middleware
      req.user = user;

      next();
    } catch (err) {
      //if validation is not successful clear the cookie
      res.clearCookie("auth");
      // and redirect to login page
      res.redirect("/users/login");
    }
  } else {

    next();
  }
};
