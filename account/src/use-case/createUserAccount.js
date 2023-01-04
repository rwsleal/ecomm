import * as fs from 'fs';

const getUserId = () => {
    const accounts = JSON.parse(fs.readFileSync('accounts.json'));

    return accounts.length + 1
}

const saveUser = (user) => {
    const accounts = JSON.parse(fs.readFileSync('accounts.json'));
    const newAccounts = [...accounts, user];

    fs.writeFileSync('accounts.json', JSON.stringify(newAccounts));
}

const createUserUseCase = (name, email, password) => {
    const userInfo = {
        id: getUserId(),
        name,
        email,
        password,
        createdDate: new Date().toISOString().substring(0,10)
    }
    
    saveUser(userInfo);

    return userInfo
}

console.log(createUserUseCase('nome', 'email', 'password'));

export { createUserUseCase }