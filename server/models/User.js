import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },

  username: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },

  password: {
    type: String,
    required: false,
    min: 6,
    max: 1024,
  },

  tasks: {
    type: Array,
    required: false,
  },

  authorized: {
    type: Boolean,
    default: false,
    required: false,
  },

  authToken: String,

  authTokenExpires: Date,
});

export default mongoose.model("Users", UserSchema);
// 'Users' -> name of collection in mongodb cluster
