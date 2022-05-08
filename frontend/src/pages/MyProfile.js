
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'

class MyProfile extends Component {
	
	constructor(props) {
		super(props);
        this.state = {
            ProfileCompleted : false,
            
            // oldPassword : "",
            username : "",
            password : ""
        };
	}

    //To check whether user has completed form or not
  //   callAPI() {
  //       Axios.post("http://localhost:9000/p2pLending/isProfileComplete", {
  //           email: localStorage.getItem('emailReg'),
  //       }).then((response) => {
  //         console.log(response);
  //         // console.log("Hiiii")
  //         if(response.data.result){
  //           if(response.data.result === true){
  //               this.setState({
  //                   ...this.state,
  //                   ProfileCompleted : true,
  //               });            
  //           }
  //         }
  //       });
	// }
	
	// componentWillMount() {
	// 	this.callAPI();
	// } 


    //All the handle INput functions for forms 
    handleInputChanged(event) {
        this.setState({
            ...this.state,
            [event.target.name] : event.target.value,
        });
      }
    
    handlePasswordButtonClicked() {
        // var first_name = this.state.first_name;
        console.log(this.state)
        const { password1, password2 } = this.state;
    // perform all neccassary validations
    if (password1 !== password2) {
        alert("Passwords don't match");
    } else {
        // make API call
        if( this.state.password1 !== ""      
        ){
            //Axios ka post request daalna hai 
            Axios.post("http://localhost:9000/myProfile/myProfilePassword", {               
                op: localStorage.getItem("passwordReg"),
                username: localStorage.getItem("usernameReg"),
                // oldPassword : this.state.oldPassword,
                password1 : this.state.password1,
                
            }).then((response) => {
                console.log(response);
                // console.log("Hiiii")
            if(response.data.success){
                console.log("Changed Password");
                window.location.href = "/";
            }
            });
        }
        else{
            this.setState({
                ...this.state,
                message : "Please fill all fields",
            });
        }
    }
        
        
    }
    handleButtonClicked() {
          // var first_name = this.state.first_name;
          console.log(this.state)
          
          if( this.state.username !== "")
          {
              //Axios ka post request daalna hai 
              Axios.post("http://localhost:9000/myProfile/myProfileUsername", {               
                  oldUsername: localStorage.getItem("usernameReg"),
                  username : this.state.username,
              }).then((response) => {
                  console.log(response);
                  // console.log("Hiiii")
              if(response.data.success){
                  console.log("Changed Username");
                  window.location.href = "/";
              }
              });
          }
          else{
              this.setState({
                  ...this.state,
                  message : "Please fill all fields",
              });
          }
          
      }
    render(){


        // const renderProfileCompletedButton = () => {
              return (
                <>
                
                <div className="container-scroller"> 
                <TopNavbar/>
          <div className="container-fluid page-body-wrapper">
            <RightNavbar/>
            <LeftNavbar/>
            
            

            <div className="main-panel">
              <div className="content-wrapper">  
              <MainHeader name="My Profile"/>
                <br></br>
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Change Username</h4>
                      <p className="card-description">
                        {/* <h6 className='text-danger'></h6> */}
                      </p>

                        <div className="form-group">
                          <label htmlFor="exampleTextarea4">Enter New Username</label>
                          <input  className="form-control" id="exampleTextarea4" rows={4}   
                          value={this.state.username} 
                          onChange={this.handleInputChanged.bind(this)} name="username"  type="textarea" /> 
                        </div>
                        <button type="submit" onClick={this.handleButtonClicked.bind(this)}  className="btn btn-primary me-2">Update</button>

                    </div>
                  </div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Change Password</h4>
                      <p className="card-description">
                        {/* <h6 className='text-danger'></h6> */}
                      </p>
                        
                        
                        {/* <div className="form-group">
                          <label htmlFor="exampleTextarea2">Enter Old Password</label>
                          <input className="form-control" id="exampleTextarea2" rows={4}   
                          value={this.state.oldPassword} 
                          onChange={this.handleInputChanged.bind(this)} name="oldPassword"  type="textarea" /> 
                        </div> */}
                        <div className="form-group">
                          <label htmlFor="exampleTextarea3">Enter New Password</label>
                          <input className="form-control" id="exampleTextarea3" rows={4}   
                          value={this.state.password1} 
                          onChange={this.handleInputChanged.bind(this)} name="password1"  type="password" /> 
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleTextarea3">Re-Enter New Password</label>
                          <input className="form-control" id="exampleTextarea3" rows={4}   
                          value={this.state.password2} 
                          onChange={this.handleInputChanged.bind(this)} name="password2"  type="password" /> 
                        </div>
                        
                        <button type="submit" onClick={this.handlePasswordButtonClicked.bind(this)}  className="btn btn-primary me-2">Update</button>

                    </div>
                  </div>
                </div>
              </div>              
            </div>

          </div>
         
        </div>
            </>
              );
        //     }
          

        // return (
        //     <>
        //         {renderProfileCompletedButton()}
        //     </>
        //     )
        }
    }

export default MyProfile;



