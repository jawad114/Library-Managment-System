const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/adminApis/bookController');
const { protect, admin } = require('../../middleware/authMiddelware');

router.post('/', protect, admin, bookController.addBook);
router.put('/:id', protect, admin, bookController.updateBook);
router.delete('/:id', protect, admin, bookController.deleteBook);
router.get('/', protect, bookController.viewBooks);


module.exports = router;
