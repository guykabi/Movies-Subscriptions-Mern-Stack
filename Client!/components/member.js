import { useState,useEffect } from "react"; 
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'

const Member = (props)=>
{ 
      const navigate = useNavigate() 
      const [bool,setBool]=useState(true) 
      const [effectOn,setEffectOn]=useState(0)
      const [addSubscription,setAddSubscription]=useState({})

    const subs = props.member.subscriptions?.map((sub,index)=>
    {
        return <li key={index}> <Link style={{textDecoration:'none',color:'black'}} to={`/main/singlemovie/${sub.movieID}`}> <b>{sub.Moviename}</b> </Link> - {sub.Date}</li>
    })   


    const options = props.member.unwatched.map((u,index)=>
    {
        return  <option key={index} value={u.ID}>{u.Name}</option>
    }) 

    const showHide = ()=>
    { 
        //Change the boolean that effect the appearance of the Add Sub Div
        setBool(!bool)
    } 

    const buildSub = (e)=>
    {
      const {name,value} = e.target 
      setAddSubscription({...addSubscription,[name]:value})
      
    }

    const addSub = (e)=>
    {  
        //Triggering the useEffect the will send the update to the server and change 
        //the boolean to switch over to the first div
        e.preventDefault()
        setAddSubscription({...addSubscription,MemberID:props.member.ID})
        setEffectOn(effectOn+1)
        showHide()
    } 

    useEffect(()=>
    {
        if(effectOn>0)
        {
            const sendNewSub = async ()=>
            {
                const {data:res}= await axios.post("http://localhost:8000/subscribe/",addSubscription)
                props.fromSub()
            } 
            sendNewSub()
        }
    },[effectOn]) 


    const toPop = ()=>
    { 
        props.sureNotice(props.member.ID)
    }

    return(
        <div className="movieDiv">
           <div className="movieMiniDiv"> <br />
               Name:&nbsp;{props.member.Name} <br /> 
               Email:&nbsp;{props.member.Email} <br />
               City:&nbsp;{props.member.City} &nbsp; &nbsp; &nbsp; &nbsp;
                <button className="addSubBtn" onClick={showHide}>Add Sub</button>
                     <br /> <br />
                 <div className={bool?'subsDivOn':'subsDivOff'}> 
                    <h6> <strong>Subscriptions </strong></h6> 
                    <ul>
                      {subs}
                    </ul>  
                 </div>  
               <div className={bool?'addSubDivOff':'addSubDivOn'}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <strong>Add Subscription</strong>
                      <form onSubmit={addSub}>
                          <input type="date"  required onChange={buildSub} name="Date" style={{width:'200px',height:'30px'}}/> <br /> 
                          <select required className="selectMovie" name="MovieID" onChange={buildSub}>
                          {options}
                          </select> &nbsp;&nbsp;
                           <button className="addSubBtn" type="submit">Add</button>
                      </form>
               </div>
                    <br />
                  <button className="btnMovie" onClick={()=>navigate(`/main/editmember/${props.member.ID}`)}>Edit</button> 
                  <button className="btnMovie" onClick={toPop} >Delete</button>
                
            </div>
        </div>
    )
} 
export default Member