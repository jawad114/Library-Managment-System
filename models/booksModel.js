const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    borrowed: { type: Boolean, default: false },
    publication_year: { type: Number }
});

module.exports = mongoose.model('Book', bookSchema);
