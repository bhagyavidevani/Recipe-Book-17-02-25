import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
// import logo4 from '../Auth/img/logo4.png';
import google from '../Auth/img/google.png'
import logo from '../Auth/img/logo.png'
import signbg from '../Auth/img/loginbg.png';
import { useDispatch, useSelector} from 'react-redux';
import { addNewUserAsync, googleLoginAsync, loginUserAsync } from '../../Services/Action/Authaction';
import { useNavigate } from 'react-router';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.AuthReduces);

  const [isSignUp, setIsSignUp] = useState({
    email: '',
    password: '',
    conpassword: ''
  });

  const [isSignIn, setIsSignIn] = useState({
    Email: "",
    Password: ""
  });

  const handelChanged = (e) => {
    const { name, value } = e.target;
    setIsSignUp({
      ...isSignUp,
      [name]: value,
    });
    setIsSignIn({
      ...isSignIn,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (isSignUp.password === isSignUp.conpassword) {
      dispatch(addNewUserAsync(isSignUp));
    } else {
      alert("Password & confirm Password do not match!");
    }
  };

  const handleGoogleLogin=()=>{
    dispatch(googleLoginAsync())
  }

  const handelSubmited = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(isSignIn));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.signUp-link');
    const signInLink = document.querySelector('.signIn-link');

    signUpLink.addEventListener('click', () => {
      wrapper.classList.add('animate-signIn');
      wrapper.classList.remove('animate-signUp');
    });

    signInLink.addEventListener('click', () => {
      wrapper.classList.add('animate-signUp');
      wrapper.classList.remove('animate-signIn');
    });

    return () => {
      signUpLink.removeEventListener('click', () => {
        wrapper.classList.add('animate-signIn');
        wrapper.classList.remove('animate-signUp');
      });
      signInLink.removeEventListener('click', () => {
        wrapper.classList.add('animate-signUp');
        wrapper.classList.remove('animate-signIn');
      });
    };
  }, []);

  return (
    <Container fluid className='bg'>
      <Row>
        <Col xs={12} md={6}>
          <img src={signbg} alt="background" className="login-bg-image" width={'780px'} style={{marginTop:"130px"}}/>
        </Col>
        <Col xs={12} md={6}>
          <div className="sign" style={{marginTop:"50px"}}>
            <div className="wrapper">
              <div className="form-wrapper sign-up">
                <Form onSubmit={handelSubmit}>
                  <h2 className="d-flex justify-content-around align-items-center">
                    <img src={logo} alt="logo" width={"100px"} />
                    <p className="fs-1 fw-bold" style={{ color: '#011958',paddingTop:'8px' }}>
                      Recipe Book
                    </p>
                  </h2>
                  <h6 style={{fontSize:'18px'}}>Sign Up to continue</h6>
                  <div className='text-center'>
                    <button style={{padding:'10px 30px', borderRadius:'999px',marginTop:'30px',border:'1px solid #F582AE',backgroundColor:'white'}} onClick={handleGoogleLogin}>
                       <img src={google} alt="google" width={'auto'} height={'30px'} style={{marginRight:'10px'}}/>
                       Sign Up with Google
                    </button>
                    <p style={{margin:'30px 0',fontSize:'18px'}}>OR</p>
                  </div>
                  <div className="input-group">
                    <input type="email" required name="email" value={isSignUp.email} onChange={handelChanged} />
                    <label>Email</label>
                  </div>
                  <div className="input-group">
                    <input type="password" required name="password" value={isSignUp.password} onChange={handelChanged} />
                    <label>Password</label>
                  </div>
                  <div className="input-group">
                    <input type="password" required name="conpassword" value={isSignUp.conpassword} onChange={handelChanged} />
                    <label>Confirm Password</label>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                  <button type="submit" className="btn">Sign Up</button>
                  </div>
                  <div className="sign-link">
                    <p>
                      Already have an account?{' '}
                      <a href="javascript:void(0)" className="signIn-link">Sign In</a>
                    </p>
                  </div>
                </Form>
              </div>

              {/* Sign In Form */}
              <div className="form-wrapper sign-in">
                <Form onSubmit={handelSubmited}>
                <h2 className="d-flex justify-content-around align-items-center">
                    <img src={logo} alt="logo" width={"100px"} />
                    <p className="fs-1 fw-bold" style={{ color: '#011958',paddingTop:'8px' }}>
                      Recipe Book
                    </p>
                  </h2>
                  <h6 style={{fontSize:'18px'}}>Login to continue</h6>
                  <div className='text-center'>
                    <button style={{padding:'10px 30px', borderRadius:'999px',marginTop:'30px',border:'1px solid #F582AE',backgroundColor:'white'}} onClick={handleGoogleLogin}>
                       <img src={google} alt="google" width={'auto'} height={'30px'} style={{marginRight:'10px'}}/>
                       Login with Google
                    </button>
                    <p style={{margin:'30px 0',fontSize:'18px'}}>OR</p>
                  </div>
                  <div className="input-group">
                    <input type="text" name="Email" required value={isSignIn.Email} onChange={handelChanged} />
                    <label>Email</label>
                  </div>
                  <div className="input-group">
                    <input type="password" name="Password" required value={isSignIn.Password} onChange={handelChanged} />
                    <label>Password</label>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <button type="submit" className="btn">Login</button>
                  </div>
                  <div className="sign-link">
                    <p>
                      Do not have an account?{' '}
                      <a href="javascript:void(0)" className="signUp-link">Sign Up</a>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
