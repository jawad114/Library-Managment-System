const Book = require('../../models/booksModel');
const User = require('../../models/userModel');

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
    const { title, author, genre } = req.query;
    const filter = {};
    if (title) filter.title = new RegExp(title, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    try {
        const books = await Book.find(filter);
        res.json(books);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Borrow a Book
const borrowBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book || book.borrowed) {
            return res.status(400).json({ error: 'Book is not available' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        book.borrowed = true;
        await book.save();
        user.borrowed_books.push(book._id);
        await user.save();
        res.json({ message: 'Book borrowed successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Return a Book
const returnBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book || !book.borrowed) {
            return res.status(400).json({ error: 'Book is not borrowed' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        book.borrowed = false;
        await book.save();
        user.borrowed_books = user.borrowed_books.filter(b => b.toString() !== bookId);
        await user.save();
        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// View Borrowed Books
const viewBorrowedBooks = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('borrowed_books');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.borrowed_books);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    viewBooks,
    borrowBook,
    returnBook,
    viewBorrowedBooks
};
