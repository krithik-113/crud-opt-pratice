const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required:true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone:{type:Number,required:true}
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel