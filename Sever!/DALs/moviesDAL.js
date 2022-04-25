const Movies = require('../models/moviesModel') 

const getMovies = ()=>
{
    return new Promise((resolve,reject)=>
    {
        Movies.find({},function(err,data){
            if(err)
            {
                reject(err) 
            } 
            resolve(data)
        })
    })
} 
module.exports = {getMovies}