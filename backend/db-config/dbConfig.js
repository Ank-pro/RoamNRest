const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.error('Database connection failed', err);
    }
};

module.exports = dbConnect;
