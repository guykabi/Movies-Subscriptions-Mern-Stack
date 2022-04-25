import {useParams,useNavigate} from 'react-router-dom'  
import axios from 'axios' 
import { useEffect, useState } from 'react'


const SingleMember = ()=>
{
    const {id} = useParams()  
    const [memberData,setMemberData]=useState({})
    const  [changeStyle,setChangeStyle]=useState(true)
    const navigate = useNavigate()

    useEffect(()=>
    {
        const getData = async ()=> 
        {
            const {data:res}= await axios.get("http://localhost:8000/members/"+id)
            setMemberData(res)
        } 
        getData()
    },[])  

    const finalDelete = async () =>
    {
        const {data:res} =await axios.delete("http://localhost:8000/members/"+id) 
        navigate('/main/members')
    }



    return(
        <div> 
            <div className={changeStyle?'zindex2':'zindex'}>
                  <br />
                  <h2>Delete?</h2> <br />
                  <button class="btn btn-light" onClick={finalDelete}>Yes</button> &nbsp;&nbsp;&nbsp;&nbsp; 
                  <button class="btn btn-light" onClick={()=> setChangeStyle(!changeStyle)}>No</button>
             </div>
             <div>
              <h2>{memberData.Name}</h2> 
              <br /> 
              <div className='singleMember'>
                  <h5>{memberData.Name}</h5> <br /> 
                      {memberData.Email} - {memberData.City}
                      <br /> <br />
                      <button className="btnMovie" onClick={()=>navigate(`/main/editmember/${id}`)}>Edit</button> 
                      <button className="btnMovie" onClick={()=>setChangeStyle(!changeStyle)}>Delete</button>
                
              </div> <br /><br />
            </div>
        </div>
    )
} 
export default SingleMember