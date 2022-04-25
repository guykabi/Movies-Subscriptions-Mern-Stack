const mongoose  = require('mongoose') 
const {Schema} = mongoose 

const SubscriptionSchema = new Schema({ 
    MovieID:String, 
    MemberID:String, 
    Date:String
}) 

module.exports = mongoose.model('subscriptions',SubscriptionSchema)