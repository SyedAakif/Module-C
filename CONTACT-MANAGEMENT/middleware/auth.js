const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get the Token from the Header
    const token = req.header('x-auth-token');
    // If token doesn't exists
    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied, token missing.' })
    }
    // Verify Token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();

    } catch (err) {
        res.status(401).json({ msg: "Invalid Token" })
    }

}