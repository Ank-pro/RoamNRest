const express = require('express');
const WishList = require('../model/wishlistSchema');
const verifyUser = require('../middleware/verifyUser');
const route = express.Router();

route.post('/wishlist',verifyUser, async (req, res) => {
        const wishList = new WishList(req.body);
    try {
        const savedWishList = await wishList.save();
        res.status(201).json(savedWishList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create wishlist' })
    }
})

route.get('/wishlist',verifyUser, async (req, res) => {
    try {
        const wishlistData = await WishList.find();
        res.status(200).json(wishlistData);
    }
    catch(err){
        console.log(err);
        res.status(404).json({message : 'Couldnt find'})
    }

})

route.delete('/wishlist/:id',verifyUser,async(req,res)=>{
    const idToDelete = req.params.id;
    try{
    await WishList.findByIdAndDelete(idToDelete);
    res.status(200).json({message : 'Data deleted'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message : 'Cannot delete the data'})
    }
})

module.exports = route;