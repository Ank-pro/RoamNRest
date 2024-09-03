const mongoose = require('mongoose');

const Category = mongoose.model('category',{
    category : {type : String,required : true}
})

module.exports = Category;