import axios from 'axios'
import {Outlet, useNavigate} from 'react-router-dom'
import Movie from "./movie"
import { useEffect,useState } from "react"



const AllMovies = ()=>
{ 
   const navigate = useNavigate()
  const [allMovies,setAllMovies]=useState([])
  const [backUp,setBackUp]=useState([])
  const  [changeStyle,setChangeStyle]=useState(true)
  const [movieToDelete,setMovieToDelete]=useState('')

  useEffect(()=>{
      const getData =  async()=>
       {
         //Send the token to the server for authentication
         const token =  sessionStorage.getItem('accessToken')  
         const {data:res}=await axios.get("http://localhost:8000/movies",{
         headers: {
           'x-access-token': token 
           }
        }) 
         setAllMovies(res)
         setBackUp(res)

       } 
      getData()
  },[])    

  const newestData =  async()=> 
  { 
    //Trigered by the child component to get the newest data
    // after the chnages that been made
    const token =  sessionStorage.getItem('accessToken')  
    const {data:res}=await axios.get("http://localhost:8000/movies",{
    headers: {
       'x-access-token': token 
       }
    })  
    //Saving in two states for the search part
    setAllMovies(res)
    setBackUp(res)
  } 

   const change = (val)=>
   { 
     //The function that called when user want to delete item
     setChangeStyle(!changeStyle)
     setMovieToDelete(val)
   }

   const finalDelete =  async () =>
   { 
     //The function that called when user is sure of deleting item
     const {data:res}=await axios.delete("http://localhost:8000/movies/"+movieToDelete)
     setChangeStyle(!changeStyle) 
     await newestData()
   }


  const searchi = (e)=>
  {
    let some = backUp.filter(m=> m.Name.toLowerCase().includes(e.target.value) ) 
    setAllMovies(some)
  }
   
    return(
        <div> 
           <div className={changeStyle?'zindex2':'zindex'}>
                  <br />
                  <h2>Delete?</h2> <br />
                  <button class="btn btn-light" onClick={finalDelete}>Yes</button> &nbsp;&nbsp;&nbsp;&nbsp; 
                  <button class="btn btn-light" onClick={()=> setChangeStyle(!changeStyle)}>No</button>
           </div>
           <div className={changeStyle?'allMoviesDiv':'allMoviesDiv2'}>

              <br />  
              <h2>All movies</h2>
              <br /> 
              <input type="text" onChange={searchi} placeholder='Search'/> <br /><br />
              <br /> <br />
               <div className='allmovies'>
                  {allMovies?.map((movie,index)=>{
                  return  <Movie sureNotice={change}  key={index} movie={movie} /> 
                  })}
               </div>
           </div>
        </div>
    )
} 
export default AllMovies