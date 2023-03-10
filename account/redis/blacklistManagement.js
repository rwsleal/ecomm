import { promisify } from 'util';
import blacklist from './blacklist.js';
import { decodeTokenExp } from '../src/helpers/jwtHelper.js';
import { createHash } from '../src/helpers/bcryptHelper.js';

const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const blacklistAdd = async (token) => {
    const tokenHash = createHash(token);
    const expirationDate = decodeTokenExp(token);
    await setAsync(tokenHash, '');
    blacklist.expireat(tokenHash, expirationDate);
};

const blacklistCheck = async (token) => {
    const tokenHash = createHash(token);
    const result = await existsAsync(tokenHash);
    return result === 1;
};

export {
    blacklistAdd,
    blacklistCheck,
};