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
const confirm = async (req, res, next) => {
    const { id } = req.params;
    const { paymentId } = req.body;

    Order.findByIdAndUpdate(id, { $set: { status: 'PAID' } }, { new: true }, (err, order) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(order);
        }
    });

    Order.findById(id, async (err, order) => {
        const { clientId, products } = order;

        const invoiceProducts = products.map((item) => {
            const { product, quantity, unitPrice, discount } = item;
            const price = unitPrice - discount;

            return { product, quantity, price };
        });

        if (err) {
            next(err);
        } else {
            const { name, cpf, address } = await fetchAccountById(clientId);
            const payload = { name, cpf, address, products: invoiceProducts };
            await fetchPaymentById(paymentId, payload);
        }
    });
};

export { confirm, create };