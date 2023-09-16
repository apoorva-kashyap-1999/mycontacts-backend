const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please put your name"],
    },
    email: {
      type: String,
      required: [true, "Please put your email id"],
      unique:[true,'E-mail already exists']
    },
    password: {
      type: String,
      required: [true, "Please put your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =  mongoose.model('User', userSchema);
