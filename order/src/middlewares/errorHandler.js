const errorHandler = (err, req, res, _next) => {
    console.log(err);

    if (err.message.includes('|')) {
        const [code, message] = err.message.split('|');
        return res.status(Number(code)).json({ message });
    }

    return res.status(500).json({ message: 'Something went wrong' });
};

export default errorHandler;