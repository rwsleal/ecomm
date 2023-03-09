import { searchUserAccountByEmailUseCase } from '../src/use-case/searchUserAccountByEmail.js';

const caseWasFound = searchUserAccountByEmailUseCase('josuelima@email.com');
const caseWasNotFound = searchUserAccountByEmailUseCase('email@email.com');

console.log('Response when it succeeds:', '\n', caseWasFound);
console.log('Response when it fails:', '\n', caseWasNotFound);