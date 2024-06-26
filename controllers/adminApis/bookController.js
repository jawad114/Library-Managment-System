const Book = require('../../models/booksModel');

// Add a Book
const addBook = async (req, res) => {
    const { title, author, genre, borrowed, publication_year } = req.body;
    try {
        const newBook = new Book({ title, author, genre, borrowed, publication_year });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a Book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a Book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// View Books
const viewBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, title, author, genre } = req.query;
        const query = {};

        if (title) query.title = { $regex: title, $options: 'i' };
        if (author) query.author = { $regex: author, $options: 'i' };
        if (genre) query.genre = { $regex: genre, $options: 'i' };

        const books = await Book.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Book.countDocuments(query);

        res.status(200).json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    viewBooks
};
