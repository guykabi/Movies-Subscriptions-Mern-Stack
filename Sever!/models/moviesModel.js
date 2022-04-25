const mongoose  = require('mongoose') 
const {Schema} = mongoose 

const MoviesSchema = new Schema({ 
    //_id : String,
    Name:String,
    Year_premiered: Number, 
    Genres: [String], 
    Image:String
}) 

module.exports = mongoose.model('movies',MoviesSchema)