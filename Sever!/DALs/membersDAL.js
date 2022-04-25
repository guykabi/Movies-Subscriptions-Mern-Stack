const membersModel = require('../models/membersModel') 

const getMembers = ()=>
{
    return new Promise((resolve,reject)=>
    {
        membersModel.find({},function(err,data){
            if(err)
            {
                reject(err)
            }
            resolve(data)
        })
    })
} 

module.exports = {getMembers}