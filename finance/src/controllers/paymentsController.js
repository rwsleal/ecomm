/* eslint-disable max-lines-per-function */
const db = require('../models/index.js');

const create = async (req, res) => {
    const payment = { ...req.body, cardNumber: Number(req.body.cardNumber), status: 'CREATED' };

    const { id, status } = await db.Payments.create(payment);

    return res.status(201).set('Location', `/payments/${id}`).json({ id, status });
};

const getById = async (req, res) => {
    const { id } = req.params;

    const payment = await db.Payments.findOne(
        { 
            where: { id },
            attributes: { exclude: ['cvv'] },
        },
    );

    if (!payment) {
        return res.status(200).json({});
    }

    return res.status(200).json(payment);
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status, description } = req.body;

    const getPaymentStatus = await db.Payments.findOne({ where: { id } });
    let statusCheck = true;

    switch (getPaymentStatus.status) {
        case 'CREATED':
            statusCheck = (status === 'CONFIRMED' || status === 'CANCELED');
            break;
        default:
            statusCheck = false;
        }

    if (!statusCheck) throw new Error('422|"status" has an invalid value');

    db.sequelize.transaction(async (t) => {
        const response = await db.Payments.update(
            { status },
            { where: { id } },
            { transaction: t },
        );
        // eslint-disable-next-line camelcase
        await db.Invoices.create({ description, payment_id: id }, { transaction: t });

        return response;
    });
    
    return res.status(200).json({ message: `Payment ${status}` });
};

module.exports = { create, getById, updateStatus };