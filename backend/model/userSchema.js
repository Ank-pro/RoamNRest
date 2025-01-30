const mongoose = require('mongoose')

const User = mongoose.model('user', {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true }
})

module.exports = User;