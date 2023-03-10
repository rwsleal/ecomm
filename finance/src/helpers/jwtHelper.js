const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const checkToken = (token) => {
    try {
        const payload = jwt.verify(token, SECRET);
        return payload;
    } catch (err) {
        throw new Error('401|Token must be a valid one');
    }
};

module.exports = { checkToken };