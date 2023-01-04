import * as fs from 'fs';

const getUserId = () => {
    const accounts = JSON.parse(fs.readFileSync('accounts.json'))

    return accounts.length + 1
}

const createUserUseCase = (name, email, password) => {
    const userInfo = {
        id: getUserId(),
        name,
        email,
        password,
        createdDate: new Date().toISOString().substring(0,10)
    }
    
    return userInfo
}

export { createUserUseCase }