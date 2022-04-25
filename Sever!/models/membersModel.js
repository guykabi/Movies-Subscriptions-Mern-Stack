const mongoose = require('mongoose') 
const {Schema} = mongoose 

let MemberSchema = new Schema({
    Name:String, 
    Email:String, 
    City:String
}) 
module.exports = mongoose.model('members',MemberSchema)