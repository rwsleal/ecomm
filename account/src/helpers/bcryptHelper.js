import bcrypt from 'bcryptjs';

const createHash = async (string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(string, salt);
};

const checkPassword = (password, passwordHash) => {
    const check = bcrypt.compareSync(password, passwordHash);

    return check;
};

export { createHash, checkPassword };