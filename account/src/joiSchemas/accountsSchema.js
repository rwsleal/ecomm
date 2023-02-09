import Joi from 'joi';

const stateRegex = /(A[CLMP]|BA|CE|DF|ES|GO|M[AGST]|P[ABEIR]|R[JNORS]|S[CEP]|TO)/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$/;

const addressSchema = Joi.object().keys({
    street: Joi.string().required().messages({
        'any.required': '400|"street" is required',
    }),
    number: Joi.string().alphanum().required().messages({
        'any.required': '400|"number" is required',
        'string.alphanum': '422|"number" must be an alphanumeric',
    }),
    complement: Joi.string(),
    district: Joi.string().required().messages({
        'any.required': '400|"district" is required',
    }),
    cep: Joi.string().min(8).max(8).pattern(/^[0-9]*$/)
        .required()
        .messages({
            'any.required': '400|"CEP" is required',
            'number.min': '422|"CEP" must have eight numbers',
            'number.max': '422|"CEP" must have eight numbers',
            'string.pattern.base': '422|"CEP" must only have numbers',
        }),
    city: Joi.string().required().messages({
        'any.required': '400|"city" is required',
    }),
    state: Joi.string().pattern(stateRegex).required().messages({
        'any.required': '400|"state" is required',
        'string.pattern.base': '422|"state" must be a valid one',
    }),
});

export default Joi.object({
    name: Joi.string().required()
    .messages({
        'any.required': '400|"name" is required',
    }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
        .messages({
            'any.required': '400|"email" is required',
            'string.email': '422|"email" must have a valid format',
        }),
    password: Joi.string().min(9).pattern(passwordRegex).required()
        .messages({
            'any.required': '400|"password" is required',
            'number.min': '422|"password" must be greater than eight digits',
            'string.pattern.base': '422|"password" must have valid characteres',
        }),
    cpf: Joi.string().min(11).max(11).pattern(/^[0-9]*$/)
        .required()
        .messages({
            'any.required': '400|"CPF" is required',
            'number.min': '422|"CPF" must have eleven numbers',
            'number.max': '422|"CPF" must have eleven numbers',
            'string.pattern.base': '422|"CPF" must only have numbers',
        }),
    phone: Joi.string().min(10).max(13).pattern(/^[0-9]*$/)
        .required()
        .messages({
            'any.required': '400|"phone" is required',
            'number.min': '422|"phone" must have at leastten numbers',
            'number.max': '422|"phone" must have at most thirteen numbers',
            'string.pattern.base': '422|"phone" must only have numbers',
        }),
    address: addressSchema.required().messages({
        'any.required': '400|"address" is required',
    }),
});