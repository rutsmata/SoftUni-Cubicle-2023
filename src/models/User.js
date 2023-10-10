const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//describe what data and properties should be created in the db
const userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    // validate: {
    //     validator: function (value) {
    //         return this.repeatPassword === value;
    //     },
    //     message: `Password mismatch!`
    // }
  },
});

//create virtual property which is not stored in db and make the validation
userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new mongoose.MongooseError("Password missmatch!");
  }
});

// hash the password and add salt 10 turnover
userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
