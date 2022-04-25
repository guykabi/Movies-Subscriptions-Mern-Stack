import {Routes,Route} from 'react-router-dom' 
import Login from './components/Login'
import Main from './components/Main'
import AllMembers from './components/allMembers'
import AllMovies from './components/allMovies'
import EditMovie from './components/editMovie'
import AddMember from './components/addMember'
import EditMember from './components/editMember'
import AddMovie from './components/addMovie'
import SingleMovie from './components/singleMoviePage'
import SingleMember from './components/singleMemberPage'
import './App.css'


const App = ()=>
{
  return(
    <div>  
      
            <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/main' element={<Main />}>
                <Route path='/main/allmovies' element={<AllMovies/>}/> 
                <Route path='/main/editmovie/:id'  element={<EditMovie/>}/>
                <Route path='/main/addmovie' element={<AddMovie/>}/> 
                <Route path='/main/members' element={<AllMembers/>}/>
                <Route path='/main/addmember' element={<AddMember/>} />
                <Route path='/main/editmember/:id' element={<EditMember/>} />
                <Route path='/main/singlemovie/:id' element={<SingleMovie/>} />
                <Route path='/main/singlemember/:id' element={<SingleMember/>} />

              </Route>
              
            </Routes>
    </div>
  )
} 
export default App