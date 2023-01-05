import * as fs from 'fs';

const getUserId = () => {
    const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json')); //precisei colocar o caminho relativo ao root para o container funcionar corretamente

    return accounts.length + 1
}

const saveUser = (user) => {
    const accounts = JSON.parse(fs.readFileSync('./src/use-case/accounts.json'));
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

export { createUserUseCase }