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

const confirm = async (req, res, next) => {
    const { id } = req.params;
    const { paymentId } = req.body;

    Order.findById(id, async (err, order) => {
        const { clientId, products } = order;

        if (err) {
            next(err);
        } else {
            const { name, cpf, address } = await fetchAccountById(clientId);
            const payload = { name, cpf, address, products };
            await fetchPaymentById(paymentId, payload);
        }
    });
};

export { confirm, create };