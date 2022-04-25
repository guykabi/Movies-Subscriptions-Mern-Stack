import axios from 'axios' 
import {useState} from 'react'  
import { useNavigate } from 'react-router-dom'


const Login = () =>
{  
    const navigate = useNavigate()
    const [login,setLogin]=useState({}) 
    const [bool,setBool]=useState(false)

   const send = async (e)=> 
   { 
       e.preventDefault()
       //Send to the server to authanticate the user's details
       const {data:res} = await axios.post("http://localhost:8000/login",login)
       if(res ==='username or password are incorrect')
       {
          setBool(!bool)
       }  
       else{ 
           //Set both token and full name of the user in the sessionStorage
           sessionStorage.setItem('accessToken',res.accessToken) 
           sessionStorage.setItem('fullname',res.Fullname) 
           navigate('/main/allmovies')
       }

   }
    return(
        <div className='loginDiv'>
          <div className="wrapper">
             <div className="text-center mt-4 name"> <h2>Login</h2></div>
                <form className="p-3 mt-3" onSubmit={send} >
                    <div className="form-field d-flex align-items-center"> <span className="far fa-user"></span> 
                      <input type="text"required onChange={(e)=>{setLogin({...login,Username:e.target.value})}} placeholder="Username"/> 
                    </div>
                    <div className="form-field d-flex align-items-center"> <span className="fas fa-key"></span> 
                    <input type="password"  required onChange={(e)=>{setLogin({...login,Password:e.target.value})}} placeholder="Password"/> 
                     </div> 
                    <span className={bool?'show':'hide'}>Username or password are incorrect</span> <br />
                    <button className="btn mt-3" type='submit'>Login</button>
                </form> 
             </div> <br /> <br />
        </div>
    )
} 
export default Login