const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/userApis/bookController');



router.post('/borrow', bookController.borrowBook);
router.post('/return', bookController.returnBook);
router.get('/borrowed/:userId', bookController.viewBorrowedBooks);

module.exports = router;
