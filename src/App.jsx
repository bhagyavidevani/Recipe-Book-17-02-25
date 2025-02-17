
import { Route,Routes } from 'react-router'
import './App.css'
import Home from './componet/Home'
import AddRecipe from './componet/AddRecipe'
import Login from './componet/Auth/Login'
import SingalPage from './componet/SingalPage'
import Recipe from './componet/Recipe'
import Footer from './componet/Footer'
import EditRecipe from './componet/EditRecipe'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/recipe' element={<Recipe/>}/>
        <Route path='/AddBook' element={<AddRecipe/>}/>
        <Route path='/edit/:id' element={<EditRecipe/>}/>
        <Route path='/singalPage/:id' element={<SingalPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
