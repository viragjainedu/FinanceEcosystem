import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function ForgotPassword(){

  const CheckEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
  
  const [emailReg, setEmailReg] = useState("");
  const [ForgotPasswordStatus, setForgotPasswordStatus] = useState("");

  const SendPassword = (e) => {
    
    e.preventDefault();
    
    if(CheckEmail(emailReg)){

      Axios.post('http://localhost:9000/Forgotpassword',{
        email: emailReg
      }).then((response) => {
          console.log(response)
          if(response.data.success){
            setForgotPasswordStatus("Mail Sent Successfully")
          }else{
            setForgotPasswordStatus(response.data.failure)
          }
        });
  
    }else{
      setForgotPasswordStatus("Enter Valid Email")
    }
  }

        return(
            <>
         <div className="container-scroller">
  <div className="container-fluid page-body-wrapper full-page-wrapper">
    <div className="content-wrapper d-flex align-items-center auth px-0">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              <img src="../../images/finance.png" alt="logo" />
            </div>
            <h4>Forgot Password</h4>
            
            <h6 className='text-success'>{ForgotPasswordStatus}</h6>
            <form className="pt-3">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="exampleInputEmail1"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmailReg(e.target.value);
                 }}
                />
              </div>
              <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn "
                onClick={SendPassword}
              >
                Send Password
              </button>
              <div className="text-center mt-4 fw-light">
                Have an account?{" "}
                <Link to="/Login" ><a className="text-primary">Login</a></Link>
                  
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* content-wrapper ends */}
  </div>
  {/* page-body-wrapper ends */}
</div>

            </>
        )
}
export default ForgotPassword;
