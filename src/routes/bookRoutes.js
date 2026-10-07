const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Đường dẫn thực tế: GET http://localhost:3000/books
router.get('/', bookController.getBooks);

// Đường dẫn thực tế: POST http://localhost:3000/books/add
router.post('/add', bookController.addBook);

module.exports = router;