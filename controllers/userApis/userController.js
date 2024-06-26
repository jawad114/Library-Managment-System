const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');

// Generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '1h' });
};

// Register a User
const registerUser = async (req, res) => {
    const { name, email, contact_number, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({ name, email, contact_number, password });
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            contact_number: newUser.contact_number,
            token: generateToken(newUser._id),
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login a User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                contact_number: user.contact_number,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update User Details
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// View Users
const viewUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const users = await User.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await User.countDocuments();

        res.status(200).json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    viewUsers
};
