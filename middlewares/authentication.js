const { verifyToken } = require("../services/jwtAuth");

/**
 * @desc    Middleware to check if a user is authenticated via token in cookies
 * @param   {string} cookie - The name of the cookie storing the token
 * @returns {function} Middleware function for authentication
 */
function checkForAuthenticateUser(cookie) {
    return (req, res, next) => {
        // Allow requests to registration, login, and root paths without authentication
        if (req.path === '/api/user/register' || req.path === '/api/user/login' || req.path === '/') {
            return next();
        }

        // Get the token from cookies
        const token = req.cookies[cookie];
        if (!token) {
            return res.status(400).json({ error: 'Authentication is required !!' });
        }

        try {
            // Verify the token and assign the decoded payload to the req object
            const payload = verifyToken(token);
            req.user = payload;

            // Proceed to the next middleware or route handler
            return next();
        } catch (error) {
            console.log("There is some error", error);
            return next();
        }
    };
}

module.exports = {
    checkForAuthenticateUser
};
