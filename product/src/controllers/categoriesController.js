import Category from '../models/Category.js';

const create = (req, res, next) => {
    const category = new Category(req.body);

    category.save((err) => {
        if (err) {
            next(err);
        } else {
            res.status(201).json(category);
        }
    });
};

const getById = (req, res, next) => {
    const { id } = req.params;
        Category.findOne({ id }, (err, category) => {
            if (err) {
                next(err);
              } else {
                res.status(200).json(category);
              }
        });
};

const update = (req, res, next) => {
    const { id } = req.params;

    Category.findOneAndUpdate({ id }, { $set: req.body }, { new: true }, (err, category) => {
      if (err) {
        next(err);
    } else {
        res.status(200).set('Location', `/admin/categories/${category.id}`)
            .send({ message: 'Category successfully updated' });
      }
    });
  };

const remove = (req, res, next) => {
    const { id } = req.params;

    Category.findOneAndRemove({ id }, (err) => {
      if (err) {
        next(err);
    } else {
        res.status(204).send({ message: 'Category successfully deleted' });
      }
    });
  };

export { create, getById, update, remove };