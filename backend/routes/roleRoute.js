const express = require('express');
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole
} = require('../controllers/roleController');
const { checkRole, verifyToken } = require('../middleware/authmiddleware');

const router = express.Router();
router.use(verifyToken); 
router.post('/', checkRole(['admin']), createRole)
.get('/', checkRole(['admin']), getRoles)
.get('/:id', checkRole(['admin']), getRoleById)
.put('/update/:id', checkRole(['admin']), updateRole)
.delete('/delete/:id', checkRole(['admin']), deleteRole);

module.exports = router;
