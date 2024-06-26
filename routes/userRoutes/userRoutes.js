const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userApis/userController');
const { protect, admin } = require('../../middleware/authMiddelware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);
router.get('/', protect, admin, userController.viewUsers);

module.exports = router;
