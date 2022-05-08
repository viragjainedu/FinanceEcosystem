
import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function LeftNavbar (){
  
  const signout = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:9000/login/logout",{
      email : localStorage.getItem('emailReg')
    }).then(res =>{
      localStorage.clear();
    })
    window.location.href = "/Login";
  };

	return (
        <>
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="/AdminPanel">
                  <i className="mdi mdi-grid-large menu-icon" />
                  <span className="menu-title">Hello, {localStorage.getItem('usernamReg')}</span>
                </a>
              </li>
              <li className="nav-item nav-category">Bank Features</li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                  <i className="menu-icon mdi mdi-floor-plan" />
                  <span className="menu-title">Your Account</span>
                  <i className="menu-arrow" /> 
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <Link to="/SystemNotifications"><a className="nav-link" >System Notifications</a></Link></li>
                    <li className="nav-item"> <Link to="/LoanApprovalUnverified"><a className="nav-link" >Loan Approval Unverified</a></Link></li>
                    <li className="nav-item"> <Link to="/LoanApprovalVerified"><a className="nav-link" >Loan Approval Verified</a></Link></li>
                    <li className="nav-item"> <Link to="/LoanDefaulted"><a className="nav-link" >Loan Defaults</a></Link></li>
                    <li className="nav-item"> <Link to="/LoanCompleted"><a className="nav-link" >Loan Completed</a></Link></li>
                    <li className="nav-item"> <Link to="/AddRemoveBlogs"><a className="nav-link" >Add/Remove Blogs</a></Link></li>
                    <li className="nav-item"><a onClick={signout} className="nav-link" href="">Sign Out</a></li>

                  </ul>
                </div>
              </li>
              {/* <li className="nav-item nav-category">help</li>
              <li className="nav-item">
                <a className="nav-link" href="http://bootstrapdash.com/demo/star-admin2-free/docs/documentation.html">
                  <i className="menu-icon mdi mdi-file-document" />
                  <span className="menu-title">Chatbot</span>
                </a>
              </li> */}
            </ul>
          </nav>
        </>
    )
}

export default LeftNavbar;


   