import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Register(){

  const CheckEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
  const CheckPassword = (inputtxt) => { 
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(inputtxt.match(decimal)){ 
      return true;
    }
    else{ 
      return false;
    }
  }
  
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState ("");
  const [usernameReg, setUsernameReg] = useState ("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [otpReg, setOtpReg] = useState("");
  const [otpRecieved, setOtpRecieved] = useState(154);

  const sendOTP = (e) => {
    
    e.preventDefault();

    if(CheckEmail(emailReg)){
      if( CheckPassword(passwordReg)  ){
        if(usernameReg != ""){
          setRegisterStatus("Insert OTP - sent to this email(if valid)");
        
          Axios.post('http://localhost:9000/sendOTP',{
            email: emailReg
          }).then((response) => {
  
            // console.log(response);
            setOtpRecieved(response.data);
  
            });
          }else{
            setRegisterStatus("Please Enter Username")
          }
        } 
        else{
          setRegisterStatus("at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, 8 to 15 characters ")   
         }    
      }else{
        setRegisterStatus("Invalid Email")
      }
  }

  const register = (e) => {

    e.preventDefault();

    //if correct otp
    console.log(otpRecieved)
    console.log(otpReg)

    if(otpRecieved == otpReg){
      Axios.post('http://localhost:9000/register', {
        email: emailReg,
        password: passwordReg,
        username: usernameReg,
        }).then((response) => {
          
          console.log(response);
          
          if(response.data.message){
            setRegisterStatus(response.data.message)  
            console.log(response.data.message)
          }else if(response.data.success){
            setRegisterStatus(response.data.success)
          }else{
  
          }
        }).then(() => {
          localStorage.setItem("emailReg", emailReg);
          localStorage.setItem("passwordReg", passwordReg);
          localStorage.setItem("usernameReg", usernameReg);
          window.location.href  = `/Dashboard` 
        });
    }
    else{
      setRegisterStatus("Please enter correct otp")
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
            <h4>Register</h4>
            <h6 className='text-success'>{registerStatus}</h6>
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
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="Username"
                  onChange={(e) =>{
                    setUsernameReg(e.target.value);
                 }}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) =>{
                    setPasswordReg(e.target.value);
                 }}
                />
              </div>
              <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn "
                onClick={sendOTP}
              >
                Send OTP
              </button>
              
              <div className="form-group mt-2">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="OTP"
                  onChange={(e) =>{
                    setOtpReg(e.target.value);
                 }}
                />
              </div>

              <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
              onClick={register}
              >
                Register
              </button>

              <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input" />
                    Keep me signed in
                  </label>
                </div>
                {/* <a className="auth-link text-black">
                  Forgot password?
                </a> */}
              </div>
              {/* <div className="mb-2">
                <button
                  type="button"
                  className="btn btn-block btn-facebook auth-form-btn"
                >
                  <i className="ti-facebook me-2" />
                  Connect using facebook
                </button>
              </div> */}
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
export default Register;
