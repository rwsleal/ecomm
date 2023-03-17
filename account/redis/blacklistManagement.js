import { promisify } from 'util';
import { createHash } from 'crypto';
import blacklist from './blacklist.js';
import { decodeTokenExp } from '../src/helpers/jwtHelper.js';

const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const generateTokenHash = (token) => createHash('sha256')
  .update(token)
  .digest('hex');

const blacklistAdd = async (token) => {
    const tokenHash = generateTokenHash(token);
    const expirationDate = decodeTokenExp(token);
    await setAsync(tokenHash, '');
    blacklist.expireat(tokenHash, expirationDate);
};

const blacklistCheck = async (token) => {
    const tokenHash = await generateTokenHash(token);
    const result = await existsAsync(tokenHash);
    return result === 1;
};

export {
    blacklistAdd,
    blacklistCheck,
};