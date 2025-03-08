
import { Route,Routes, useLocation, useNavigate } from 'react-router'
import './App.css'
import Home from './componet/Home'
import AddRecipe from './componet/AddRecipe'
import Login from './componet/Auth/Login'
import SingalPage from './componet/SingalPage'
import Recipe from './componet/Recipe'
import EditRecipe from './componet/EditRecipe'
import { useSelector } from 'react-redux'

function App() {
  const { user } = useSelector((state) => state.AuthReduces);
  return (
    <>
      <Routes>
        <Route path='/' element={user? <Home/>:<Login/>}/>
        <Route path='/recipe' element={user?<Recipe/>:<Login/>}/>
        <Route path='/AddRecipe' element={user?<AddRecipe/>:<Login/>}/>
        <Route path='/edit/:id' element={user?<EditRecipe/>:<Login/>}/>
        <Route path='/singalPage/:id' element={user?<SingalPage/>:<Login/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
