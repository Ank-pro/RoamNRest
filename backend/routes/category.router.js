const express = require('express');
const route = express.Router();
const Category = require('../model/categorySchema');
const categoryData = require('../my-data/categories')

route.post('/category/addMany', async (req, res) => {
    try {
        const categories = await Category.insertMany(categoryData.data);
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.json({message : 'Could not add data in DB'});
    }

})

route.get('/category',async(req,res)=>{
    try {
        const list = await Category.find({});
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(404).json({message : 'Couldnt find data'})
    }
})

module.exports = route;