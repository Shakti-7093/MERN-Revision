const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["admin", "superadmin", "staff", "teacher"],
    default: "admin",
  },
  createtedAt: new Date.now(),
  updatetedAt: {
    type: Date,
    default: new Date.now(),
  },
  deletetedAt: {
    type: Date,
    default: null,
  },
  token: {
    type: String,
  },
  access_token: {
    type: String,
  },
  refresh_token: {
    type: String,
  },
  sequity_key: {
    type: String,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
