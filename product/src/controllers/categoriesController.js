import Category from '../models/Category.js';

const create = (req, res) => {
    const category = new Category(req.body);

    category.save((err) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else {
            res.status(201).json(category);
        }
    });
};

export { create };