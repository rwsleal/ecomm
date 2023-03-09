import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};

const checkPassword = (password, passwordHash) => {
    const check = bcrypt.compareSync(password, passwordHash);

    return check;
};

export { hashPassword, checkPassword };