import fetch from 'node-fetch';

const fetchAccountById = async (id) => {
    const response = await fetch(`http://ecomm-account:3002/accounts/${id}`);
    const account = await response.json();
    return account;
};

const fetchPaymentById = async (id, payload) => {
    await fetch(
        `http://ecomm-finance:3004/admin/payments/${id}`,
        {
            method: 'PATCH',
            body: JSON.stringify({ status: 'CONFIRMED', description: JSON.stringify(payload) }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        },
    );
};

export { fetchAccountById, fetchPaymentById };