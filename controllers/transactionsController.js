const ProductTransaction = require('../models/ProductTransaction');

const listTransactions = async (req, res) => {
    const { month, search = '', page = 1, per_page = 10 } = req.query;

    const query = {
        dateOfSale: {
            $gte: new Date(`2021-${month}-01`),
            $lte: new Date(`2021-${month}-31`)
        }
    };

    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { price: parseFloat(search) || 0 }
        ];
    }

    const transactions = await ProductTransaction.find(query)
        .skip((page - 1) * per_page)
        .limit(parseInt(per_page));

    res.json(transactions);
};

module.exports = { listTransactions };