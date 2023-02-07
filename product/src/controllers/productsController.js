import Product from '../models/Product.js';

const getAll = (_req, res) => {
    Product.find((_err, products) => res.status(200).json(products));
};

const create = (req, res, next) => {
    const product = new Product(req.body);

    product.save((err) => {
        if (err) {
            next(err);
        } else {
            res.status(201).set('Location', `/admin/products/${product.id}`).json(product);
        }
    });
};

const getById = (req, res, next) => {
    const { id } = req.params;

    Product.findById(id, (err, product) => {
        if (err) {
            next(err);
          } else {
            res.status(201).json(product);
          }
    });
};

export { getAll, create, getById };