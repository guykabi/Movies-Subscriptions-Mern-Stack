const subscribe = require('../models/subscriptionsModel') 

const getSubscribes = ()=>{
    return new Promise((resolve,reject)=>{
        subscribe.find({},function(err,data)
        {
           if(err)
           {
               reject(err)
           }
           resolve(data)
        })
    })
}  

const deleteMovieSubscribe = (id)=>
{
    return new Promise((resolve,reject)=>
    {
       subscribe.deleteMany({MovieID:id},function(err){
           if(err)
           {
               reject(err) 
           } 
           resolve('Deleted')
       })
    })
} 

const deleteMemberSubscribe = (id)=>
{
    return new Promise((resolve,reject)=>
    {
       subscribe.deleteMany({MemberID:id},function(err){
           if(err)
           {
               reject(err) 
           } 
           resolve('Deleted')
       })
    })
}

module.exports = {getSubscribes,deleteMovieSubscribe,deleteMemberSubscribe} 
