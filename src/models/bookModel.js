const mongoose = require('mongoose');
const { readConnection, writeConnection } = require('../config/database');

const bookSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true }
});

const BookRead = readConnection.model('Book', bookSchema, 'books');
const BookWrite = writeConnection.model('Book', bookSchema, 'books');

module.exports = { BookRead, BookWrite };