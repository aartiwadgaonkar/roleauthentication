const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    console.log('Role added:', role);
    await role.save();
    res.status(201).send(role);
  } catch (error) {
    res.status(400).json({ success: false, message: "Error: " + error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(400).json({ success: false, message: "Error: " + error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).send('Role not found.');
    res.json(role);
  } catch (error) {
    res.status(400).json({ success: false, message: "Error: " + error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    await Role.findByIdAndUpdate(req.params.id, req.body);
    res.send('Role updated.');
  } catch (error) {
    res.status(400).json({ success: false, message: "Error: " + error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.send('Role deleted.');
  } catch (error) {
    res.status(400).json({ success: false, message: "Error: " + error.message });
  }
};
