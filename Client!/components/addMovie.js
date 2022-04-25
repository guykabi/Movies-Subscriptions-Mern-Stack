import { useEffect, useState } from "react" 
import { useNavigate } from "react-router-dom"
import axios from 'axios'



const AddMovie = ()=>
{ 
     const navigate = useNavigate()   
     
     const [makeMovie,setMakeMovie]=useState({})
     const [makeGenres,setMakeGenres]=useState("") 
     const [bool,setBool]=useState(0) //Boolean to control the useEffect 

     const toMake = (e)=>
     { 
         //Building the movie object
         const {name,value} = e.target 
         if(name === 'Genres')
         {
             setMakeGenres(value) 
             console.log(makeGenres)
         } 
         else{
            setMakeMovie({...makeMovie,[name]:value})
            console.log(makeMovie)
         }
         
     } 

     const toAdd = (e)=>
     { 
         //Triggering useEffect that send the data to the server
         e.preventDefault()  
         let finalGenres =   makeGenres.split(',')
         setMakeMovie({...makeMovie,Genres:finalGenres}) 
         setBool(bool+1)
     } 


      useEffect(()=>
      { 
        if(bool>0)
        {
            const finalAdd =  async()=>
            {
                   let {data:res} = await axios.post("http://localhost:8000/movies/",makeMovie)
                   navigate('/main/allmovies')
            } 
            finalAdd()
        }
          
      },[bool])

    return(
        <div> <br />
            <h2>Add new Movie</h2> <br /> <br /> 
            <form onSubmit={toAdd}>
                <input placeholder="Name" required type="text" name="Name" onChange={toMake} /> <br /> 
                <input placeholder="Genres"required type="text" name="Genres" onChange={toMake} /> <br />
                <input placeholder="Year premiered" required type="text"  name="Year_premiered" onChange={toMake}/> <br />
                <input placeholder="Image Url" required type="text" name="Image" onChange={toMake} /> <br /> <br /> <br />
                <button class="btn btn-dark"  type="submit">Add</button> &nbsp; &nbsp; <button class="btn btn-dark" onClick={()=>navigate('/main/allmovies')}>Cancel</button>
                
            </form>

        </div>
    )
} 
export default AddMovie