import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        _id: { type: String, required: true },
    },
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        slug: { type: String },
        unitPrice: { type: Number },
        quantity: { type: Number },
        category: { type: categorySchema, required: true },
    },
);

const Product = mongoose.model('products', productSchema);

export default Product;