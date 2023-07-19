const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  genre: String,
  path: String,
  image: String,
  type: String,
  licence: String,
});

const Image = mongoose.model("images", imageSchema);
module.exports = Image;
