import { Navbar,Container, Button} from "react-bootstrap";
import logo from "./Auth/img/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOutAsync } from "../Services/Action/Authaction";

function Header(background) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} =useSelector(state => state.AuthReduces)
  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogOut = () => {
    dispatch(logOutAsync())
  }
  return (
      <>
         <div className="mainNavbar">
              <div className="header" style={{ backgroundColor: background }}>
                  <Container>
                    <Navbar className="justify-content-between w-100 align-items-center p-0" expand="lg">
                      <Navbar.Brand href="/" className="fs-1 fw-bold">
                        <img src={logo} alt="logo" width={"100px"} height={"60px"} />
                      </Navbar.Brand>
                      <nav >
                        <ul className="d-flex justify-content-center m-0">
                          <li><a href="/" className="p-0 fw-semibold fs-5 text-black">Home</a></li>

                          <li className="px-5"><a href="/recipe" className="p-0 fw-semibold fs-5 text-black">Recipe</a></li>

                          {user ? <li className="">
                            <div className="nav-item">
                              <div className="category-hover d-flex align-items-center">
                              <a href="/AddRecipe" className="fs-5 fw-semibold text-black">
                                AddRecipe
                              </a>
                              </div>
                            </div>
                          </li> : ""}
                          
                          
                        </ul>
                      </nav>
                      {!user ? <button onClick={handleLogin} className="btn">Login</button> : <button onClick={handleLogOut} className="btn">LogOut</button>}
                    </Navbar>
                 </Container>
              </div>
          </div>
          
      </>
  )
}

export default Header
