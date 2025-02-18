// import React from 'react'


import { Col, Container, Row } from "react-bootstrap";
import banner from "../assets/banner3.png"
import emoji1 from "../assets/emoji1.png"
import emoji2 from "../assets/emoji2.png"
import Header from "./Header";
import spices from "../assets/spices.png"
import spice1 from "../assets/spice1.png"
import spice2 from "../assets/spice2.png"
import { useNavigate } from "react-router";
import Footer from "./Footer";


function Home() {
  const navigate =useNavigate()
  const handelExaplore=()=>{
    navigate('/recipe')
  }
  
  return (
    <div>
      <Header/>
      <div className="banner p-t-100">
      
       <Container>
       <Row>
          <Col lg={6}>
            <div style={{marginTop:"10%"}}>
               <p style={{fontWeight:'500',marginBottom:'20px',color:'#011958'}}>FOODS WITH RECIPES</p>
               <div >
                  <h2 style={{fontSize:'4.5rem',fontWeight:'750',color:'#011958'}}>
                    GOOD 
                      <img src={emoji1} alt="emoji1" width={'60px'} height={'60px'}/>
                    TASTE
                  </h2>
               </div>
               <div>
                  <h2  style={{fontSize:'4.5rem',fontWeight:'750',color:'#f582ae'}}>
                    GOOD 
                      <img src={emoji2} alt="emoji2" width={'55px'} height={'55px'}/>
                    SENSE
                  </h2>
               </div>
               <p style={{marginBottom:'20px',lineHeight:'28px',color:'#011958'}}>Discover delicious recipes and culinary inspiration to elevate your cooking experience. Let's get cooking!</p>
               <div>
                  <button className="btn" onClick={handelExaplore}>Explore</button>
               </div>
            </div> 
          </Col>
          <Col lg={6}>
              <img src={banner} alt="banner" width={'500px'} style={{marginLeft:'200px',position:'relative'}}/>
              <img src={spices} alt="spices" style={{position:"absolute",top:"50%",right:"350px",height:'400px',transform:"rotate(130deg)"}} />
              <img src={spice1} alt="spice1" style={{position:"absolute",top:"21%",right:"10%",height:'50px'}}/>
              <img src={spice2} alt="spices" style={{position:"absolute",top:"30%",right:"20px",height:'110px',transform:"rotate(-10deg)"}}/>
          </Col>
        </Row>
        <div className="p-t-100">
          <div className="d-flex justify-content-center align-items-center flex-column p-t-100">
              <h2 style={{fontWeight:'600',marginBottom:'20px',color:'#011958'}}>Try these !!</h2>
              <div style={{marginTop:'1.5rem'}}>
                <button style={{padding:'15px 30px',color:'#011958',backgroundColor:'#f582ae',border:'1px solid #011958'}} onClick={handelExaplore}>See More</button>
              </div>
          </div>
        </div>
       </Container>
        
      </div>
      <Footer/>
    </div>
  )
}

export default Home
