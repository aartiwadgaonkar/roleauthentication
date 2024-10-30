const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.loginUserController = async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid USERNAME OR PASSWORD");
      }

      const token = jwt.sign({ id: user._id ,roles: user.roles}, process.env.JWT_SECRET);
      res.json({message:"login success", token , user: {
        id: user._id,
        username: user.username,
        roles: user.roles,
      },});
  
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};


