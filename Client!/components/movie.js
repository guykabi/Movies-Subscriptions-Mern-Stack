import {useNavigate,Link} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'


const Movie = (props)=>
{ 
    const navigate = useNavigate() 
    const [popUp,setPopUp]=useState(true)

    const subs = props.movie.subscriptions?.map((sub,index)=>
    {
        return <li key={index}> <Link style={{textDecoration:'none',color:'black'}} to={`/main/singlemember/${sub.memberID}`}>{sub.Membername}</Link> - {sub.Date}</li>
    })  


    const toPop = ()=>
    { 
        props.sureNotice(props.movie.ID)
    }

     

    return( 
        
        <div className="movieDiv" > 
            <div className="movieMiniDiv">
            <h5>{props.movie.Name},{props.movie.Year_premiered} </h5> <br /> 
            Genres: {props.movie.Genres.map(g=>`${g}  `)} <br /> <br />
            <img style={{width:'90px',height:'60'}} src={props.movie.Image} alt="photo" /> 
               <div 
               style={{border:'solid black 2px'
               ,width:'320px'
               ,height:'100px',
               overflow:'hidden'
               ,marginTop:'-120px'
               ,marginLeft:'150px'
               ,marginBottom:'20px'
               ,paddingLeft:'5px'}}> 
                <strong>Subscriptions</strong> 
                <br /> 
                <ul>
                    {subs}
                </ul>  
               </div> <br />
               <button className="btnMovie" onClick={()=>navigate(`/main/editmovie/${props.movie.ID}`)}>Edit</button> 
                <button className="btnMovie" onClick={toPop}>Delete</button>
                
            </div>
            
          </div>
    
    )
} 
export default Movie