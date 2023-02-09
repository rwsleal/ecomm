const validationHandler = (schema) => async (req, _res, next) => {
    const { error } = schema.validate(req.body);
    if (error) throw new Error(error.message);

    next();
};

export default validationHandler;