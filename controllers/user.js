const User = require("../models/user");

/**
 * @desc    Register a new user
 * @route   POST /auth/register
 * @access  Public
 */
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check for incomplete registration information
        if (!name || !email || !password) {
            return res.status(403).json({ msg: "Incomplete information !!" });
        }

        // Create a new user instance
        let user = new User({
            name: name,
            email: email,
            password: password
        });

        // Save the user to the database
        user = await user.save();

        if (!user) {
            return res.status(400).json({ error: "No user created !!" });
        }

        // Return the created user
        return res.status(200).json(user);
    } catch (error) {
        console.log("There is some error", error);
        return res.status(500).json({ error: error.message });
    }
}

/**
 * @desc    Log in an existing user and generate token
 * @route   POST /auth/login
 * @access  Public
 */
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Check for incomplete login information
        if (!email || !password) {
            return res.status(400).json({ msg: "Incomplete information !!" });
        }

        // Verify user credentials and generate token
        const token = await User.matchPasswordAndGenerateToken(email, password);

        if (!token) {
            return res.status(400).json({ msg: "Token not found !!" });
        }

        // Set token in a cookie and return it
        return res.cookie("token", token).status(200).json(token);
    } catch (error) {
        console.log("There is some error", error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser
};
