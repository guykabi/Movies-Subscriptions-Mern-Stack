const mongoose  = require('mongoose') 
const {Schema} = mongoose 

const LoginSchema = new Schema({
    ID : Number, 
    Fullname:String,
    Username: String, 
    Password:String, 
}) 

module.exports = mongoose.model('users',LoginSchema)