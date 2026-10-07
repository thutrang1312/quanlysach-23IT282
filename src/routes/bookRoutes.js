const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Đường dẫn thực tế: GET http://localhost:3000/
router.get('/', bookController.getBooks);

// Keep /add for compatibility and handle the form's /add-book action.
router.post('/add', bookController.addBook);
router.post('/add-book', bookController.addBook);

module.exports = router;