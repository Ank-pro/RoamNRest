const express = require('express');
const route = express.Router();
const Hotel = require('../model/hotelsSchema');
const hotels = require('../my-data/data');

route.get('/hotel',async (req,res)=>{
    try {
        const {category} = req.query;

        let query = {};
        if(category){
            query.category = category;
        }
        // console.log(category)
        const allHotels = await Hotel.find(query);  
        res.status(200).json(allHotels)   
    } catch (error) {
        res.status(404).json({message : 'Couldnt find the hotels'})
    }
    
})


route.get('/hotel/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const hotelById = await Hotel.findById(id);
        res.json(hotelById);       
    } catch (error) {
        console.log(error);
        res.json({message : 'Couldnt find the hotel'})
    }   
})

route.post('/addHotels',async(req,res)=>{
    try {
        await Hotel.deleteMany();
        const hotelsDataInDB = await Hotel.insertMany(hotels.data);
        res.json(hotelsDataInDB)
    } catch (error) {
        console.log(error)
        res.json({message : 'Cannot insert in the DB'})
    }
    
})

module.exports = route;
