const express = require('express');
const bodyParser = require('body-parser');
const adminBookRoutes = require('./routes/AdminRoutes/booksRoutes');
const userBookRoutes=require('./routes/userRoutes/bookRoutes');
const userRoutes=require('./routes/userRoutes/userRoutes')
const connectDB = require('./configuration/db');
const logger = require('./utils/logger');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use('/api/admin/books', adminBookRoutes);
app.use('/api/books', userBookRoutes);
app.use('/api/user', userRoutes);



// Connect to MongoDB
connectDB();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
