import mongoose from 'mongoose';

const deliveryAddressSchema = new mongoose.Schema(
    {
        _id: false,
        street: { type: String, required: true },
        number: { type: String, required: true },
        complement: { type: String },
        district: { type: String },
        cep: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
);

const orderSchema = new mongoose.Schema(
    {
        createdDate: { type: Date },
        clientId: { type: mongoose.Types.ObjectId, required: true },
        deliveryAddress: { type: deliveryAddressSchema, required: true },
        products: { type: Array, required: true },
        status: { type: String, required: true },
    },
);

const orders = mongoose.model('orders', orderSchema);

export default orders;