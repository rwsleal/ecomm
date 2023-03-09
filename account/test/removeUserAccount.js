import { removeUserUseCase } from '../src/use-case/removeUserAccount.js';

const caseItRemove = removeUserUseCase('josuelima@email.com');
const caseItNotRemove = removeUserUseCase('email@email.com');

console.log('Response when it succeeds:', '\n', caseItRemove);
console.log('Response when it fails:', '\n', caseItNotRemove);