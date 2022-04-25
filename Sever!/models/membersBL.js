const moviesDAL = require('../DALs/moviesDAL') 
const membersDAL = require('../DALs/membersDAL')
const subscribeDAL = require('../DALs/subscriptionsDAL') 
const membersModel = require('./membersModel') 

const getAllMembers = async ()=>
{ 
     let movies =  await moviesDAL.getMovies()
     let members = await membersDAL.getMembers() 
     let subscribe = await subscribeDAL.getSubscribes() 
     

     let membersArr = [] //Reorganizing of a new members array

    for(let i= 0; i<members.length;i++) //Loop over all the members
    {
       let obj = {} //object for every movie
       obj.ID = members[i]._id 
       obj.Name = members[i].Name
       obj.Email = members[i].Email
       obj.City = members[i].City 
       obj.subscriptions = [] 
       obj.unwatched = [] 
       
       //filter the subscriptions that match the member that currently runing
       let filteredSubs = subscribe.filter(s=>s.MemberID == members[i]._id) //Extract the member's subscriptions
       if(filteredSubs.length ===0) 
       {
         obj.unwatched = movies.map(u=>({ID:u._id,Name: u.Name}))
       }
       else
       {
           //Building the member's subscription object
          for(let j=0;j<filteredSubs.length;j++) 
          {
          let sub = {} 
          sub.Date = filteredSubs[j].Date 
          sub.movieID = filteredSubs[j].MovieID
          
          let movie = movies.find(m=>m._id == filteredSubs[j].MovieID)
          sub.Moviename = movie.Name 
          obj.subscriptions.push(sub) 
          }  
      

          //Make array of the movies the member hasn't watched yet
         let moviesIDs =  filteredSubs.map(f=>f.MovieID)  

         for(let j=0;j<moviesIDs.length;j++)
         {  
           if(obj.unwatched.length ===0)
           {
              let noneWatched = movies.filter(n=>n._id != moviesIDs[j]) 
              obj.unwatched = noneWatched.map(u=>({ID:u._id,Name: u.Name})) 
           } 
          else
           {
              let noneWatched = obj.unwatched.filter(n=>n.ID != moviesIDs[j]) 
              obj.unwatched = noneWatched.map(u=>({ID:u.ID,Name:u.Name})) 
           }
         } 
      }
      membersArr.push(obj) //Adding to the general array of the members
   } 
    return membersArr
    
}     

//Get single member
const getMember = (id) =>
{
  return new Promise((resolve,reject)=>
  {
    membersModel.findById(id,(err,data)=>{
      if(err)
      {
        reject(err)
      } 
      resolve(data)
    })
  })
}


const addMember = (newMember)=>
{
  return new Promise((resolve,reject)=>
  { 
     const member = new membersModel(newMember)
     member.save(err=>
      {
        if(err)
        {
          reject(err)
        } 
        resolve('Added Successfully')
      })
  })
} 

const updateMember = (id,obj)=>
{
  return new Promise((resolve,reject)=>
  {
    membersModel.findByIdAndUpdate(id,obj,(err)=>{
      if(err)
      {
        reject(err)
      }
      resolve('Updated Successfully')

    })
  })
}



const deleteMember = (id)=>
{
    return new Promise((resolve, reject) => {
        membersModel.findByIdAndDelete(id, async (err) => {
          if (err) {
            reject(err);
          } 
           let resp = await subscribeDAL.deleteMemberSubscribe(id)
           console.log(resp)
           resolve('Deleted Successfully');
        });
      });
}

module.exports = {getAllMembers,getMember,addMember,updateMember,deleteMember}