 //Import all the dals files
const moviesDAL = require('../DALs/moviesDAL') 
const membersDAL = require('../DALs/membersDAL')
const subscribeDAL = require('../DALs/subscriptionsDAL')
const movieModel = require('./moviesModel')

const getAllMovies = async()=> 
{ 
   let movies =  await moviesDAL.getMovies()
   let members = await membersDAL.getMembers() 
   let subscribe = await subscribeDAL.getSubscribes() 

   let moviesArr = [] //Reorganizing of a new movies array
   for(let i= 0; i<movies.length;i++) //Loop over all the movies
   {
      let obj = {}  //object for every movie
      obj.ID = movies[i]._id 
      obj.Name = movies[i].Name
      obj.Year_premiered = movies[i].Year_premiered
      obj.Genres = movies[i].Genres 
      obj.Image = movies[i].Image
      obj.subscriptions = [] 
      
      //filter the subscriptions that match the movie that currently runing
      let filteredSubs = subscribe.filter(s=>s.MovieID == movies[i]._id)
      //Building the movie's subscription object
      for(let j=0;j<filteredSubs.length;j++) 
      {
         let sub = {} 
         sub.Date = filteredSubs[j].Date 
         sub.memberID = filteredSubs[j].MemberID
         let member = members.find(m=>m._id == filteredSubs[j].MemberID)
         sub.Membername = member.Name 
         obj.subscriptions.push(sub)
      } 
      moviesArr.push(obj) //Adding to the general array of the movies
   } 
   return moviesArr
   
}   

//Get single movie
  const getMovie = (id)=>
  {
     return new Promise((resolve,reject)=>
     {
       movieModel.findById(id,(err,data)=>
       {
            if(err)
            {
              reject(err)
            } 
           
            resolve(data)
       })
     })
  }

const addMovie= (newMovie) => {
   return new Promise((resolve, reject) => {
     const movi = new movieModel(newMovie);
     movi.save((err) => {
       if (err) {
         reject(err);
       } 
       resolve('Added Successfully');
     });
   });
 };  


 const updateMovie = (id, movieToUpdate) => {
   return new Promise((resolve, reject) => {
     movieModel.findByIdAndUpdate(id, movieToUpdate, (err) => {
       if (err) {
         reject(err);
       }
       resolve('Updated Successfully');
     });
   });
 };  


 const deleteMovie = (id) => {
   return new Promise((resolve, reject) => {
     movieModel.findByIdAndDelete(id, async (err) => {
       if (err) {
         reject(err);
       } 
        let resp = await subscribeDAL.deleteMovieSubscribe(id) 
        console.log(resp)
        resolve('Deleted Successfully');
     });
   });
 }; 

module.exports = {getAllMovies,getMovie,addMovie,updateMovie,deleteMovie}