const { listTransactions } = require('./transactionsController');
const { getStatistics } = require('./statisticsController');
const { getBarChart, getPieChart } = require('./chartsController');

const getCombined = async (req, res) => {
    const { month } = req.query;

    const transactions = await listTransactions(req, res);
    const statistics = await getStatistics(req, res);
    const barChart = await getBarChart(req, res);
    const pieChart = await getPieChart(req, res);

    res.json({
        transactions,
        statistics,
        barChart,
        pieChart
    });
};

module.exports = { getCombined };