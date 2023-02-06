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

const getById = (req, res, next) => {
    const { id } = req.params;
        Category.findById(id, (err, category) => {
            if (err) {
                next(err);
              } else {
                res.status(201).json(category);
              }
        });
};

const update = (req, res, next) => {
    const { id } = req.params;

    Category.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, category) => {
      if (err) {
        next(err);
    } else {
        res.status(200).set('Location', `/admin/categories/${category.id}`)
            .send({ message: 'Category successfully updated' });
      }
    });
  };

export { create, getById, update };