require('dotenv').config()
const express= require('express')
const router = express.Router() 
const jwt = require('jsonwebtoken') 
const membersBL = require('../models/membersBL') 

router.route('/').get(async(req,resp)=>
{ 
    const token = req.headers['x-access-token']; 
    if (!token) {
        return resp.status(401).json('No Token Provided');
      }
    
      //const ACCESS_SECRET_TOKEN = 'holla';
    
      jwt.verify(token, process.env.ACCESS_SECRET_TOKEN,async (err, data)  => {
        if (err) {
          return resp.status(500).json('Failed to authenticate token');
        }

    let members = await membersBL.getAllMembers() 
    return resp.json(members) 
    })
})   


router.route('/:id').get(async(req,resp)=>
{
    const {id}=  req.params 
    let data = await membersBL.getMember(id) 
    return resp.json(data)
})


router.route('/').post(async(req,resp)=>
{
    let {body} = req
    let data = await membersBL.addMember(body)
    return resp.json(data)
})


router.route('/:id').put(async(req,resp)=>
{
    let {id} = req.params 
    let {body} = req
    let data = await membersBL.updateMember(id,body)
    return resp.json(data)
})



router.route('/:id').delete(async(req,resp)=>
{
    let {id} = req.params
    let data = await membersBL.deleteMember(id) 
    return resp.json(data)
})

module.exports = router