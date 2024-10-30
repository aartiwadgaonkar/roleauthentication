const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const hashPass = bcrypt.hashSync(req.body.password);
    const result = await User.create({
      ...req.body,
      password: hashPass,
      admin: false,
      roles: req.body.roles || 'user'
    });
    const token = jwt.sign({ id: result._id,roles:result.roles }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token,"tk");
    
    res.json({
      success: true,
      message: "user created successfully",
      result: {
        id: result._id,
        username: result.username,
        admin: result.admin,
        roles:result.roles,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    // const users = await User.find().populate("role");
    res.json({ message: "user fetch successfully", users });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error:unable to fetch " + error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user) return res.status(404).send("User not found.");
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error: " + error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("User updated.");
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error: " + error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted.");
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error: " + error.message });
  }
};
exports.deleteAllUser = async (req, res) => {
  try {
    await User.deleteMany();
    res.send("User deleted.");
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error: " + error.message });
  }
};
