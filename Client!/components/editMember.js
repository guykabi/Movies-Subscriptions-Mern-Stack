import axios from 'axios' 
import {useEffect,useState} from 'react' 
import {useNavigate,useParams} from 'react-router-dom'

const EditMember = ()=>
{  
    const navigate = useNavigate() 
    const {id} = useParams()
    const [memberData,setMemberData]=useState({}) 
    const [bool,setBool]=useState(0)  
  

    useEffect(()=>
    { 
        //Getting the data of the member that the user choose by his id
        const dataMember = async ()=>
        {
            const {data:res}= await axios.get("http://localhost:8000/members/"+id)
            setMemberData(res)
        }
        dataMember()
    },[])


     const editMember = (e)=>
     {
          const {name,value}=e.target 
          setMemberData({...memberData,[name]:value}) 
     } 

     const setEdit = (e)=>
     { 
         e.preventDefault()
         setBool(bool+1)
     }


    useEffect(()=>
    { 
        if(bool>0)
        {
           const sendEdit =  async()=>
           {
              const {data:res} = await axios.put("http://localhost:8000/members/"+id,memberData)
              navigate('/main/members')
           }   
           sendEdit() 
        }
    },[bool])



    return(
        <div> 
            <h2>Edit Member</h2>
             <form onSubmit={setEdit}>
                 <input placeholder='Name' required onChange={editMember} defaultValue={memberData.Name} type="text" name="Name"  /><br />
                 <input placeholder='Email' required onChange={editMember} defaultValue={memberData.Email} type="text" name="Email"  /><br />
                 <input placeholder='City' required onChange={editMember} defaultValue={memberData.City} type="text" name="City"  /><br /> <br />
                 <button class="btn btn-dark" type='submit'>Edit</button> &nbsp;&nbsp;&nbsp;&nbsp; 
                 <button class="btn btn-dark" onClick={()=> navigate('/main/members')} >Cancel</button>
             </form>
        </div>
    )
} 

export default EditMember