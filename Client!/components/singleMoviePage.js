import {useParams,useNavigate,Link} from 'react-router-dom'  
import axios from 'axios' 
import { useEffect, useState } from 'react'


const SingleMovie = ()=>
{ 
    const navigate = useNavigate()
    const {id} = useParams()   
    const  [changeStyle,setChangeStyle]=useState(true)
    const [movieData,setMovieData]=useState({})

    useEffect(()=>
    {
        const getData = async ()=> 
        {
            const {data:res}= await axios.get("http://localhost:8000/movies/"+id)
            setMovieData(res)
            
        } 
        getData()
    },[]) 

    

   const finalDelete = async () =>
    {
        const {data:res} = await axios.delete("http://localhost:8000/movies/"+id)
        navigate('/main/allmovies')
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
                 <br />
                 <h2>{movieData.Name}</h2> 
                 <br /> 
                 <div className='singleMovie'>
                    <h5>{movieData.Name}-{movieData.Year_premiered}</h5> <br /> 
                    Genres: {movieData.Genres?.map(g=>`${g} `)} <br /> <br />
                     <img style={{width:'180px',height:'110',marginLeft:'110px'}} src={movieData.Image} alt="photo" /> 
                     <br /> <br />
                     <button className="btnMovie" onClick={()=>navigate(`/main/editmovie/${id}`)}>Edit</button> 
                     <button className="btnMovie" onClick={()=>setChangeStyle(!changeStyle)}>Delete</button>
                 </div> <br /><br />
            </div>
        </div>
    )
} 
export default SingleMovie
