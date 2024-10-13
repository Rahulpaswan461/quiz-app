const JWT = require("jsonwebtoken");

/**
 * Generates a JWT for user authentication.
 * @param {Object} user - The user object.
 * @returns {string} - The generated JWT.
 */
function createTokenForAuthenticateUser(user) {
    const payload = { _id: user._id, name: user.name, email: user.email };
    return JWT.sign(payload, process.env.SECRET, { expiresIn: '2h' });
}

/**
 * Verifies a JWT and returns the decoded payload.
 * @param {string} token - The JWT to verify.
 * @returns {Object} - The decoded payload.
 * @throws {Error} - Throws an error if the token is invalid or absent.
 */
function verifyToken(token) {
    if (!token) throw new Error("No token is present !!");
    return JWT.verify(token, process.env.SECRET);
}

module.exports = {
    createTokenForAuthenticateUser,
    verifyToken
};
