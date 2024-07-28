
const ProductTransaction = require('../models/ProductTransaction');

const getBarChart = async (req, res) => {
    const { month } = req.query;
    const ranges = {
        '0-100': { $lte: 100 },
        '101-200': { $gt: 100, $lte: 200 },
        '201-300': { $gt: 200, $lte: 300 },
        '301-400': { $gt: 300, $lte: 400 },
        '401-500': { $gt: 400, $lte: 500 },
        '501-600': { $gt: 500, $lte: 600 },
        '601-700': { $gt: 600, $lte: 700 },
        '701-800': { $gt: 700, $lte: 800 },
        '801-900': { $gt: 800, $lte: 900 },
        '901-above': { $gt: 900 }
    };

    const result = {};

    for (const [key, range] of Object.entries(ranges)) {
        const count = await ProductTransaction.countDocuments({
            dateOfSale: {
                $gte: new Date(`2021-${month}-01`),
                $lte: new Date(`2021-${month}-31`)
            },
            price: range
        });
        result[key] = count;
    }

    res.json(result);
};

const getPieChart = async (req, res) => {
    const { month } = req.query;

    const categories = await ProductTransaction.aggregate([
        {
            $match: {
                dateOfSale: {
                    $gte: new Date(`2021-${month}-01`),
                    $lte: new Date(`2021-${month}-31`)
                }
            }
        },
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        }
    ]);

    const result = {};
    categories.forEach(category => {
        result[category._id] = category.count;
    });

    res.json(result);
};

module.exports = { getBarChart, getPieChart };
