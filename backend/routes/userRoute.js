const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authmiddleware");

const router = express.Router();

router
  .post("/add", createUser)
  .get("/",authMiddleware,  getUsers)
  .get("/:id", authMiddleware, getUserById)
  .put("/update/:id", authMiddleware, updateUser)
  .delete("/delete/:id", authMiddleware, deleteUser);

module.exports = router;
