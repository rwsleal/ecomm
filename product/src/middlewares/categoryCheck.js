import Category from '../models/Category.js';

const categoryCheck = async (req, res, next) => {
    const { categoryId } = req.body.category;

    const categoryExists = await Category.findById(categoryId);

    if (!categoryExists) {
        throw new Error('422|invalid category id provided');
    }

    next();
};

export default categoryCheck;