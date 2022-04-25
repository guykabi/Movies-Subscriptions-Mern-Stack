import {useNavigate,Outlet, Link} from 'react-router-dom'
import { useEffect,useState } from "react"
import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Main = ()=>
{   
  const navigate = useNavigate()
  const [fullname,setFullname]=useState("")

 //Getting the uses's full name
  useEffect(()=>
  {
    const fromSession = async()=>
    {
      const Fullname =  sessionStorage.getItem('fullname')
      setFullname(Fullname)
    } 
    fromSession()
  },[]) 

  
  const logOut = ()=>
  {
    sessionStorage.clear() 
    navigate('/')
  }

    return(
        <div>
          <Navbar  bg="dark" variant="dark" fixed="top"   >
            <Container  >
               <Navbar.Brand>{fullname}</Navbar.Brand> 
                   <Nav  className="me-auto">
                     <NavDropdown title="Movies" id="nav-dropdown-dark-example">
                       <div className="dropdown-content">
                        <button onClick={()=> navigate('/main/allmovies')}>All Movies</button> <br />
                        <button onClick={()=> navigate('/main/addmovie')}>Add Movie</button>
                       </div>
                     </NavDropdown> 
                    <NavDropdown title="Members" id="nav-dropdown-dark-example">
                      <button onClick={()=> navigate('/main/members')}>All Members</button> <br />
                      <button onClick={()=> navigate('/main/addmember')}>Add Member</button> 
                    </NavDropdown> 
                     <Nav.Link className='logOutNav' onClick={logOut}>Log out</Nav.Link> 
                  </Nav>
            </Container>
          </Navbar> 
     <br /> <br /> 
              <div style={{textAlign:'center'}}>  
                <br /> 
                    <Outlet/>
              </div> 
             
        </div>
    )
} 
export default Main