import Joi from 'joi';

export default Joi.object({
    name: Joi.string().min(4).pattern(/^[^0-9]/).required()
    .messages({
        'any.required': '400|"name" is required',
        'string.min': '422|"name" length must be at least 4 characters long',
        'string.pattern.base': '422|"name" must not start with a number',
    }),
    status: Joi.string().valid('ATIVA', 'INATIVA').messages({
        'any.only': '422|"status" must be only "ATIVO" or "INATIVO"',
    }),
});