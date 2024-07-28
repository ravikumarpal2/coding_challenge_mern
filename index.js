
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const ProductTransaction = require('./models/ProductTransaction');
const transactionRoutes = require('./routes/transactions');
const statisticsRoutes = require('./routes/statistics');
const chartsRoutes = require('./routes/charts');
const combinedRoutes = require('./routes/combined');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/transactionsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

const seedDatabase = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await ProductTransaction.deleteMany({});
        await ProductTransaction.insertMany(response.data);
        console.log('Database seeded');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

app.use(express.json());
app.use('/api/transactions', transactionRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/charts', chartsRoutes);
app.use('/api/combined', combinedRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
