import Product from '../models/Product.js';

const getAll = (_req, res) => {
    Product.find((_err, products) => {
        res.status(200).json(products);
    });
};

export { getAll };