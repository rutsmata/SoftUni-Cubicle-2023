const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  difficultyLevel: Number,
  //relations section: accessories and owners, db will store ObjectId for accessory and user
  accessories: [{
    type: mongoose.Types.ObjectId,
    ref: 'Accessory',
  }],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
