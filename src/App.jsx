
import { Route,Routes, useLocation, useNavigate } from 'react-router'
import './App.css'
import Home from './componet/Home'
import AddRecipe from './componet/AddRecipe'
import Login from './componet/Auth/Login'
import SingalPage from './componet/SingalPage'
import Recipe from './componet/Recipe'
import EditRecipe from './componet/EditRecipe'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebaseConfig'

function App() {
  const [ setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser && location.pathname !== "/login") {
        navigate("/login"); 
      }
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);
  const { user } = useSelector((state) => state.AuthReduces);
  return (
    <>
      <Routes>
        <Route path='/' element={user? <Home/>:<Login/>}/>
        <Route path='/recipe' element={<Recipe/>}/>
        <Route path='/AddRecipe' element={<AddRecipe/>}/>
        <Route path='/edit/:id' element={<EditRecipe/>}/>
        <Route path='/singalPage/:id' element={<SingalPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
