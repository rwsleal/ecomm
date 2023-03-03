import { changeUserNameUseCase } from '../src/use-case/changeUserName.js';

const caseItChanges = changeUserNameUseCase('josuelima@email.com', 'Richard');
const caseItNotChanges = changeUserNameUseCase('email@email.com');

console.log('Response when it succeeds:', '\n', caseItChanges);
console.log('Response when it fails:', '\n', caseItNotChanges);