import { createUserUseCase } from "../src/use-case/createUserAccount";

const response = createUserUseCase('Josué Lima', 'josuelima@email.com', 'senhaDoJosue');

console.log(response);
