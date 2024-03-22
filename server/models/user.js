const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET='abcd';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  saved: { type: [String] } 
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() },JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
