const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema')

route.post('/auth/register',async(req,res)=>{
    const {name,email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.json({message : 'User already exist'})
    }
    const salt = await bcrypt.genSalt(10);

    const hasedPassword = await bcrypt.hash(password,salt);

    const newUser = await new User({name,email,password : hasedPassword}).save();

    res.send({user : newUser})
})

route.post('/auth/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).send('Invalid credentials');
    }

    const comparedPass = await bcrypt.compare(password, user.password);

    if(comparedPass){
        const token = jwt.sign({userId : user._id},"qwerty");
        return res.status(200).send({user : user, token})
    }

    return res.status(401).send("Incorrect Login");
    
})

module.exports = route;