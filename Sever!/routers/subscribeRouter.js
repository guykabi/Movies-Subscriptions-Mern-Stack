const subscribeBL = require('../models/subscriptionsBL') 
const express = require('express') 
const router = express.Router() 

router.route('/').post(async(req,resp)=>{
   let {body} = req 
   let data = await subscribeBL.addSubscribe(body)
   return resp.json(data)
}) 

module.exports = router

