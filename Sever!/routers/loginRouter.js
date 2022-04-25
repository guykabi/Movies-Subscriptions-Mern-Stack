require('dotenv').config() 
const express = require('express') 
const loginBL = require('../models/loginBL') 
const router = express.Router() 
const jwt = require('jsonwebtoken') 

router.route('/').post(async(req,resp)=>
{ 

        const {Username,Password} = req.body
        const data  = await loginBL.getUser(Username,Password) 
        if(data.length >0)
        {
        const userId = data[0]._id
        const {Fullname} = data[0]
        //const ACCESS_SECRET_TOKEN = 'holla' 

        const accessToken = jwt.sign(
            {id:userId} ,
            process.env.ACCESS_SECRET_TOKEN
        ) 
        return resp.json({accessToken,Fullname})
        
        } 

        return resp.json('username or password are incorrect')

}) 
module.exports = router