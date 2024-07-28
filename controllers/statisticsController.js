
const ProductTransaction = require('../models/ProductTransaction');

const getStatistics = async (req, res) => {
    const { month } = req.query;

    const query = {
        dateOfSale: {
            $gte: new Date(`2021-${month}-01`),
            $lte: new Date(`2021-${month}-31`)
        }
    };

    const totalSales = await ProductTransaction.aggregate([
        { $match: query },
        { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const totalSoldItems = await ProductTransaction.countDocuments({ ...query, sold: true });
    const totalNotSoldItems = await ProductTransaction.countDocuments({ ...query, sold: false });

    res.json({
        total_sales: totalSales[0]?.total || 0,
        total_sold_items: totalSoldItems,
        total_not_sold_items: totalNotSoldItems
    });
};

module.exports = { getStatistics };
