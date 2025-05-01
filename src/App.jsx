
import { Route,Routes, useLocation, useNavigate } from 'react-router'
import './App.css'
import Home from './componet/Home'
import AddRecipe from './componet/AddRecipe'
import Login from './componet/Auth/Login'
import SingalPage from './componet/SingalPage'
import Recipe from './componet/Recipe'
import EditRecipe from './componet/EditRecipe'
import { auth } from './config/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser && location.pathname !== "/login" && location.pathname !== "/signup") {
        navigate("/login"); 
      }
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);
  return (
    <>
      <Routes>
        {/* <Route path='/' element={user? <Home/>:<Login/>}/> */}
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/recipe' element={user?<Recipe/>:<Login/>}/> */}
        <Route path='/recipe' element={<Recipe/>}/>
        {/* <Route path='/AddRecipe' element={user?<AddRecipe/>:<Login/>}/> */}
        <Route path='/AddRecipe' element={<AddRecipe/>}/>
        {/* <Route path='/edit/:id' element={user?<EditRecipe/>:<Login/>}/> */}
        <Route path='/edit/:id' element={<EditRecipe/>}/>
        {/* <Route path='/singalPage/:id' element={user?<SingalPage/>:<Login/>}/> */}
        <Route path='/singalPage/:id' element={<SingalPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
