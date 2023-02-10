const db = require('../models/index.js');

const create = async (req, res) => {
    const payment = { ...req.body, status: 'CREATED' };

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

    return res.status(200).json(payment);
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

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

    const payment = await db.Payments.update({ status }, { where: { id } });

    return res.status(200).json(payment);
};

module.exports = { create, getById, updateStatus };