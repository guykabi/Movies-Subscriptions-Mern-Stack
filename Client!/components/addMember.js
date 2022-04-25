import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState,useEffect } from "react"

const AddMember = ()=>
{
    const navigate = useNavigate()
    const [memberData,setMemberData]=useState({}) 
    const [bool,setBool]=useState(0) 

   const setAdd = (e)=>
   { 
       //Building the member object
     const {name,value} =e.target 
     setMemberData({...memberData,[name]:value}) 
   } 

   const changeBool = (e)=>
   {  
       //Triggering useEffect that send the data to the server
        e.preventDefault()
        setBool(bool+1)
   } 
    
   useEffect(()=>
   { 
       if(bool>0)
       {
       const add = async ()=>
       {
            const {data:res}= await axios.post("http://localhost:8000/members/",memberData)
            navigate('/main/members')
       } 
       add() 
      }
   },[bool])


    
    return(
        <div>
                <h2>Add Member</h2> 
                <br /> <br />
                <form onSubmit={changeBool}>
                    <input placeholder="Name" onChange={setAdd} required type="text" name="Name"  /><br />
                    <input  placeholder="Email" onChange={setAdd} required type="text" name="Email"  /><br />
                    <input placeholder="City" onChange={setAdd} required type="text" name="City"  /><br /> <br /> 
                    <button class="btn btn-dark" type="submit">Add</button>&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-dark" onClick={()=>navigate('/main/members')}>Cancel</button>
                </form>
                 

        </div>
    )
} 

export default AddMember