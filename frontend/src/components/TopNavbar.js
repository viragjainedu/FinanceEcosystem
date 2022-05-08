import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Notification from './Notification'

function TopNavbar (){


  const signout = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:9000/login/logout",{
      email : localStorage.getItem('emailReg')
    }).then(res =>{
      localStorage.clear();
    })
    window.location.href = "/Login";
  };

  const [amount, setAmount] = React.useState(null);
  var today = new Date()
  const [date, setDate] = React.useState(today.getDate()+ '/' + (today.getMonth() + 1) + '/' + today.getFullYear() );
  
  React.useEffect(() => {
    Axios.post("http://localhost:9000/account_stats/balance", {
        email: localStorage.getItem('emailReg'),
    }).then((response) => {
      console.log(response);
      if(response.data){
        setAmount(response.data.total)            
     }
    }); 
  }, []); 

	return (
        <>
         <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-contpent-start">
            <div className="me-3">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
                <span className="icon-menu" />
              </button>
            </div>
            <div>
              <a className="navbar-brand brand-logo" href="/Dashboard">
                <img src="images/finance.png" alt="" />
              </a>
              <a className="navbar-brand brand-logo-mini" href="/Dashboard">
                <img src="images/finance.png" alt="" />
              </a>
            </div>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-top"> 
            <ul className="navbar-nav">
              <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                <h1 className="welcome-text">Hello, <span className="text-black fw-bold">{localStorage.getItem('usernameReg')}</span></h1>
                <h3 className="welcome-sub-text">You Statements this week </h3>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              

              <li className="nav-item d-none d-lg-block">
                <div className="input-group date datepicker p-2 navbar-date-picker">
                  Balance - {!amount ? '0' : `${amount}`}          
                </div>
              </li>
              <li className="nav-item d-none d-lg-block">
                <div className="input-group date datepicker p-2 navbar-date-picker">
                  {!date ? '0' : `${date}`}          
                </div>
              </li>
              <li className="nav-item">
                <form className="search-form" action="/SearchResult">
                  <i className="icon-search" />
                  <input type="search" className="form-control" placeholder="Search Here" title="Search here" />
                </form>
              </li>
              <li className="nav-item dropdown"> 
                <Notification/>
              </li>
              <li className="nav-item dropdown d-none d-lg-block user-dropdown">
                <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className="img-xs rounded-circle" src="images/faces/face8.jpg" alt="Profile image" /> </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                  <div className="dropdown-header text-center">
                    <img className="img-md rounded-circle" style={{"height": "50px", "width": "50px" }} src="images/faces/face8.jpg" alt="Profile image" />
                    <p className="mb-1 mt-3 font-weight-semibold">{localStorage.getItem('usernameReg')}</p>
                    <p className="fw-light text-muted mb-0">{localStorage.getItem('emailReg')}</p>
                  </div>
                  <a className="dropdown-item" href='/myProfile'><i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" /> My Profile</a>
                  {/* <Link to="/Activity"><a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2" /> Activity</a></Link> */}
                  {/* <Link to="/testReact"><a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2" /> Test Page</a></Link> */}
                  <a onClick={signout} className="dropdown-item"><i className="dropdown-item-icon mdi mdi-power text-primary me-2" />Sign Out</a>
                </div>
              </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">
              <span className="mdi mdi-menu" />
            </button>
          </div>
        </nav>
        </>
    )
}

export default TopNavbar;
