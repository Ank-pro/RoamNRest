const express = require('express');
const app = express();
const Hotels = require('./routes/hotel');
const userAuth = require('./routes/User');
const Categories = require('./routes/category.router');
const wishList = require('./routes/wishlist.router')
app.use(express.json());
const PORT = 5000;
const port = process.env.PORT || PORT;

// database
const dbConnect = require('./db-config/dbConfig');
dbConnect();

// cors
const cors = require('cors');
const { default: mongoose } = require('mongoose');
app.use(cors());

// apis
app.use('/api',Hotels);
app.use('/api',Categories);
app.use('/api', userAuth);
app.use('/api',wishList);

mongoose.connection.once('open',()=>{
    console.log('DB is connected')
    app.listen(port,()=>{
        console.log(`Listening on ${port}`);
    })
})

