import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' });
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