const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    role: { type: String, required: true, enum: ["Admin", "Explorer"] },
    location: { type: String, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    token: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
