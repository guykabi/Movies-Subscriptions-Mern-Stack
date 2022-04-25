const subsModel = require('./subscriptionsModel') 

const addSubscribe = (obj)=>
{
   return new Promise((resolve,reject)=>
   {
        const sub = new subsModel(obj) 
        sub.save(err=>{
            if(err)
            {
                reject(err)
            } 
            resolve('Added Successfully')
        })
   })
} 

module.exports = { addSubscribe }