const mongoose = require('mongoose');

const WishList = mongoose.model('wishlist',{
    hotel_id : {type : String,required : true,unique : true}
})

module.exports = WishList;