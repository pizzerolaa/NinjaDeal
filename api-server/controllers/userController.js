const User = require('../models/userModel');
const bycrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, lastName, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email }); //check if user exists
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bycrypt.hash(password, 12); //hash password

        const user = new User({ //create new user
            name,
            lastName,
            email,
            password: hashedPassword,
        });

        await user.save(); //save user to db

        res
            .status(201)
            .json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password'); //find user by email

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bycrypt.compare(password, user.password); //compare passwords
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json(
            {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                message: 'User logged in successfully',
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => { //get user profile
    const { id } = req.params; //get id from params

    try {
        const user = await User.findById(id); //find user by id

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(
            {
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };