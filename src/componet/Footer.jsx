import { Container } from 'react-bootstrap'
import { RiInstagramLine } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <div style={{paddingTop:"130px",paddingBottom:'30px',backgroundColor:'#FEF6E4'}}>
        <Container>
            <div className='text-center'>
              <p style={{fontSize:'30px',textAlign:'center'}}>
                <a href="https://www.instagram.com/" target='_black' >
                    <RiInstagramLine style={{color:'#011958',margin:"0 20px"}}/>
                </a>
                <a href="https://www.facebook.com/" target='_black'>
                    <FaFacebook style={{color:'#011958',margin:"0 20px"}}/>
                </a>
                <a href="https://www.linkedin.com/" target='_black'>
                    <RiLinkedinBoxFill style={{color:'#011958',margin:"0 20px"}}/>
                </a>
                <a href="https://github.com/" target='_black'>
                    <AiOutlineGithub style={{color:'#011958',margin:"0 20px"}}/>
                </a>
              </p>
            </div>
            <div>
              <p className='d-flex align-items-center justify-content-center text-center w-100' style={{ fontSize:".9rem",marginTop:'50px',color:"#011958"}}>Recipe<MdCopyright />
              2025. All rights reserved.</p>
              <p style={{lineHeight:'30px',marginBottom:'1.5rem',color:"#011958"}} className='text-center'>Recipe: Your virtual culinary companion. Explore diverse recipes, from classic comfort foods to exotic delights. Elevate your cooking experience with step-by-step instructions and tantalizing flavors, all at your fingertips.</p>
            </div>
        </Container>
      </div>
    </>
  )
}

export default Footer
