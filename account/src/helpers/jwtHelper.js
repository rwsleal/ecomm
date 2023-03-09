import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const SECRET = process.env.JWT || 'jwt_secret';

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT, { expiresIn: '7d' });
    return token;
};

const checkToken = (token) => {
    try {
        const payload = jwt.verify(token, SECRET);
        return payload;
    } catch (err) {
        throw new Error('401|Token must be a valid one');
    }
};

export { createToken, checkToken };