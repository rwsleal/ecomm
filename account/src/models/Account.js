import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
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

const accountSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        createdDate: { type: Date },
        cpf: { type: String },
        phone: { type: String },
        address: { type: addressSchema, required: true },
    },
);

const Account = mongoose.model('accounts', accountSchema);

export default Account;