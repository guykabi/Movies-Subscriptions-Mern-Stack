require('dotenv').config()
 const express= require('express')
const jwt = require('jsonwebtoken') 
const router = express.Router() 
const moviesBL = require('../models/moviesBL')

router.route('/').get(async(req,resp)=>{
    const token = req.headers['x-access-token']; 
    if (!token) {
        return resp.status(401).json('No Token Provided');
      }
    
      //const ACCESS_SECRET_TOKEN = 'holla';
    
      jwt.verify(token,  process.env.ACCESS_SECRET_TOKEN,async (err, data)  => {
        if (err) {
          return resp.status(500).json('Failed to authenticate token');
        }

        let movies = await moviesBL.getAllMovies()
        return resp.json(movies);
      });
})   
 

router.route('/:id').get(async(req,resp)=>
{
    const {id} = req.params 
    let data = await moviesBL.getMovie(id) 
    return resp.json(data)
  })

router.route('/').post(async(req,resp)=>
{
  let body = req.body 
  let data = await moviesBL.addMovie(body) 
  return resp.json(data)
}) 

router.route('/:id').put(async(req,resp)=>
{
  let id = req.params.id 
  let body = req.body 
  let data = await moviesBL.updateMovie(id,body) 
  return resp.json(data)
})

router.route('/:id').delete(async(req,resp)=>{

    let {id} = req.params 
    let data = await moviesBL.deleteMovie(id) 
    return resp.json(data)
})

module.exports = router
