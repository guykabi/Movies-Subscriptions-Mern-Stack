import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useEffect,useState } from "react" 
import Member from './member'



const AllMembers = ()=>
{ 
    const navigate = useNavigate()
    const [membersData,setMembersData]=useState([])
    const  [changeStyle,setChangeStyle]=useState(true)
    const [memberToDelete,setMemberToDelete]=useState('')



    useEffect(()=>
    {
        const getData = async ()=>
        {  
            //Send the token to the server for authentication
            const token =  sessionStorage.getItem('accessToken')
            const {data:res} = await axios.get("http://localhost:8000/members",{
                headers: {
                   'x-access-token': token 
                   } 
                })
            setMembersData(res)
        }
        getData()
    },[])  
    
   

    const newestData = async ()=>
    {
        //Trigered by the child component to get the newest data
        // after the chnages that been made
        const token =  sessionStorage.getItem('accessToken')
        const {data:res} = await axios.get("http://localhost:8000/members",{
            headers: {
               'x-access-token': token 
               } 
            }) 
        setMembersData(res)
      
    } 

    const change = (val)=>
    {
        //The function that called when user want to delete item
        setChangeStyle(!changeStyle)
        setMemberToDelete(val)
    }

    const finalDelete =  async () =>
   {
       //The function that called when user is sure of deleting item
     const {data:res}=await axios.delete("http://localhost:8000/members/"+memberToDelete)
     setChangeStyle(!changeStyle) 
     await newestData()
   }

    return(
        <div > 
           <div className={changeStyle?'zindex2':'zindex'}>
                  <br />
                  <h2>Delete?</h2> <br />
                  <button class="btn btn-light" onClick={finalDelete}>Yes</button> &nbsp;&nbsp;&nbsp;&nbsp; 
                  <button class="btn btn-light" onClick={()=> setChangeStyle(!changeStyle)}>No</button>
           </div>
           <div  className={changeStyle?'allMembersDiv':'allMembersDiv2'}>
               <br /> <br /> 
              <h2>All Members</h2> 
              <br /> <br /> 
              <div className='allmovies'>
              {membersData?.map((member,index)=>{
               return  <Member sureNotice={change} fromSub={newestData}  key={index} member={member} /> 
           })}
              </div>
           </div>
        </div>
    )
} 

export default AllMembers