/* eslint-disable max-len */
import Order from '../models/Order.js';
import { fetchAccountById, fetchPaymentById } from '../helpers/fetchAPI.js';

const create = (req, res, next) => {
    const order = new Order({ ...req.body, status: 'DONE', createdDate: Date() });

    order.save((err) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(order);
        }
    });
};

// eslint-disable-next-line max-lines-per-function
const confirm = async (req, res) => {
    const { id } = req.params;
    const { paymentId } = req.body;

    const updatedOrder = await Order.findOneAndUpdate({ _id: id }, { $set: { status: 'PAID' } }, { new: true });
    
    const { clientId, products } = updatedOrder;
    
    const invoiceProducts = products.map((item) => {
        const { product, quantity, unitPrice, discount } = item;
        const price = unitPrice - discount;
        
        return { product, quantity, price };
    });
    
    const response = await fetchAccountById(clientId);
    const { name, cpf, address } = response;
    const payload = { name, cpf, address, products: invoiceProducts };
    await fetchPaymentById(paymentId, payload);

    return res.status(200).json(updatedOrder);
};

export { confirm, create };