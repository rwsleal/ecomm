import Joi from 'joi';

const categorySchema = Joi.object().keys({
    name: Joi.string().required().messages({
        'any.required': '400|category "name" is required',
    }),
    categoryId: Joi.string().required().messages({
        'any.required': '400|"categoryId" is required',
    }),
});

export default Joi.object({
    product: Joi.string().min(4).pattern(/^[^0-9]/).required()
    .messages({
        'any.required': '400|"product" is required',
        'string.min': '422|"product" length must be at least 4 characters long',
        'string.pattern.base': '422|"product" must not start with a number',
    }),
    description: Joi.string().required().messages({
        'any.required': '400|"description" is required',
    }),
    slug: Joi.string().required().pattern(/^[a-zA-Z0-9-]+$/).messages({
        'any.required': '400|"slug" is required',
        'string.pattern.base': '422|"slug" must only have letters, numbers and hyphens',
    }),
    unitPrice: Joi.number().min(0).required().messages({
        'any.required': '400|"unitPrice" is required',
        'number.min': '422|"unitPrice" must be higher than 0',
    }),
    quantity: Joi.number().min(0).max(10000).required()
    .messages({
        'any.required': '400|"quantity" is required',
        'number.min': '422|"quantity" must be higher than 0',
        'number.max': '422|"quantity" must be lower than 10000',
    }),
    category: categorySchema.required().messages({
        'any.required': '400|"category" is required',
    }),
});