import axios from 'axios' 
import { useState,useEffect } from 'react' 
import { useNavigate,useParams} from 'react-router-dom' 

const EditMovie = ()=>
{  
  const navigate = useNavigate()

    const {id}= useParams()
    const [editM,setEditM]=useState({}) 
    const [genres,setGenres]=useState("")
    const [movieData,setMovieData]=useState({})
    const [bool,setBool]=useState(0)
   

    useEffect(()=>
    {
        //Getting the data of the movie that the user choose by its id
        const getMovieId = async ()=>
        {
            const {data:res} =  await axios.get("http://localhost:8000/movies/"+id)
            setMovieData(res)
            setEditM(res)
        } 
        getMovieId()
    },[]) 


    const toEdit = (e)=>
    {
        const {name,value}= e.target 
        if(name==='Genres')
        {
            setGenres(value)
        }
        setEditM({...editM,[name]:value})
    } 
    

    const setArr = (e)=>
    {
        e.preventDefault() 
           if(genres != "")
           { 
            let finalGenres = editM.Genres.split(',')
            setEditM({...editM,Genres:finalGenres}) 
           }
       
        setBool(bool+1)

    } 

    useEffect(()=>
    {  
        if(bool>0)
        {
         const update = async()=>
        {
           const {data:res} = await axios.put("http://localhost:8000/movies/"+id,editM)
           navigate('/main/allmovies')
        }  
        update()
     }
    },[bool])
    
    return(
        <div> 
            <br /> 
            <h2>Edit Movie</h2>
               <form onSubmit={setArr}>
                   <input placeholder="Name" required type="text" name='Name' onChange={toEdit} defaultValue={movieData.Name}  /> <br />
                   <input placeholder="Genres" required type="text" name='Genres' onChange={toEdit} defaultValue={movieData.Genres}  /> <br /> 
                   <input placeholder="Year premiered" required type="text"  onChange={toEdit} name='Year_premiered' defaultValue={movieData.Year_premiered}  /><br /> 
                   <input placeholder="Image Url" required type="text" name='Image' onChange={toEdit} defaultValue={movieData.Image}  /> <br /> <br /> <br />
                   <button  class="btn btn-dark" type='submit'>Update</button>&nbsp; &nbsp; <button type="button" class="btn btn-dark" onClick={()=>navigate('/main/allmovies')}>Cancel</button>
               </form>
        </div>
    )
} 

export default EditMovie