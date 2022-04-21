import React, { useState } from 'react';
import './css/Login.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Login(){
  
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState ("");
    const [loginStatus, setLoginStatus] = useState("");
    
    const login = (e) => {
      
      // e.preventDefault();

      Axios.post("http://localhost:9000/login", {
         email: emailReg,
         password: passwordReg,
      }).then((response) => {
        console.log(response);

        if(response.data.message){
          localStorage.setItem("emailReg", emailReg);
          localStorage.setItem("passwordReg", passwordReg);
          localStorage.setItem("usernameReg", response.data.message.username);

          if(response.data.message.isAdmin === 1){
            localStorage.setItem("emailReg", emailReg);
            localStorage.setItem("passwordReg", passwordReg);
            localStorage.setItem("usernameReg", response.data.message.username);
            window.location.href = "/AdminPanel";
          }else{
            window.location.href = "/Dashboard";
          }
          console.log(response.data.message)
          
        }else if (response.data.WrongMessage){
          setLoginStatus("Incorrect Credentials")
        }else if (response.data.err){
          setLoginStatus("Error")
        }else{
          setLoginStatus("Something went Wrong")
        }
      });
    };

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
            <h4>Log In</h4>
            <h6 className='text-danger'>{loginStatus}</h6>
            <div className="pt-3">
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
                  type="password"
                  className="form-control form-control-lg"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) =>{
                    setPasswordReg(e.target.value);
                 }}
                />
              </div>
              <div className="mt-3">
              <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                onClick={login}
                >
                  Log In
                </button>
                

              </div>
              <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input" />
                    Keep me signed in
                  </label>
                </div>
                <a href="Login.js" className="auth-link text-black  ">
                  Forgot password?
                </a>
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
                Don't have an account?{" "}
                <Link to="/Register" ><p className="text-primary">Create</p></Link>
              </div>
            </div>
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
export default Login;
