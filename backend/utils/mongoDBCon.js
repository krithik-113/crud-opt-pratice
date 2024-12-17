const mongoose = require("mongoose")


const mongoDBConnection = async () => {
   await mongoose.connect(
     "mongodb+srv://krithik-0113:ACmYXPm2nGbkzRoh@cluster0.y8z4nih.mongodb.net/crud-opt-utube"
   ).then(()=>console.log('Database Connected Successfully...!'))
}

module.exports = mongoDBConnection