import fetch from 'node-fetch';

const fetchAccountById = async (id) => {
    const response = await fetch(`http://ecomm-account:3002/admin/accounts/${id}`, {
        method: 'GET',
    });
    const account = await response.json();
    return account;
};

const fetchPaymentById = async (id, payload) => {
    try {
       await fetch(
            `http://ecomm-finance:3004/payments/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({ status: 'CONFIRMED', description: JSON.stringify(payload) }),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            },
        );
    } catch (error) {
        console.log(error);
    }
};

export { fetchAccountById, fetchPaymentById };