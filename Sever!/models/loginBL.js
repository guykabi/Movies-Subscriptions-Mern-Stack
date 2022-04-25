const User = require('./loginModel') 

const getUser = (username,password)=>
{
    return new Promise((resolve,reject)=>
    {
        User.find({Username:username,Password:password},function(err,data)
        {
           if(err)
           {
               reject('Error')
           }  
           else{
            if(data ==[])
            {
                resolve("User does not exist")
            } 
            else{
             resolve(data)
            }
            
           }
           
        })
    })
} 

module.exports = {getUser}