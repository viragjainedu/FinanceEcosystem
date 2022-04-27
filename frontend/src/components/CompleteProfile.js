
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment'

class CompleteProfile extends Component {
	
	constructor(props) {
		super(props);
        this.state = {
            ProfileCompleted : false,
            first_name : "",
            last_name : "",
            gender : "",
            DOB : "",
            city : "",
            state : "",
            country : "",
            pincode : "",
            address1 : "",
            address2 : "",
            message : ""
        };
	}

    //To check whether user has completed form or not
    callAPI() {
        Axios.post("http://localhost:9000/p2pLending/isProfileComplete", {
            email: localStorage.getItem('emailReg'),
        }).then((response) => {
          console.log(response);
          // console.log("Hiiii")
          if(response.data.result){
            if(response.data.result === true){
                this.setState({
                    ...this.state,
                    ProfileCompleted : true,
                });            
            }
          }
        });
	}
	
	componentWillMount() {
		this.callAPI();
	} 


    //All the handle INput functions for forms 
    handleInputChanged(event) {
        this.setState({
            ...this.state,
            [event.target.name] : event.target.value,
        });
      }
    
    handleButtonClicked() {
        // var first_name = this.state.first_name;
        // console.log(this.state)

        var age = moment(this.state.DOB)
        var now = moment()
        

        if(this.state.first_name !== "" && this.state.last_name !== "" && this.state.DOB !== "" && this.state.gender !== "" && this.state.address1 !== ""
            && this.state.address2 !== "" && this.state.city !== "" && this.state.state !== "" && this.state.country !== "" && this.state.pincode !== ""     
        ){
            
            if(now.diff(age,'years') < 18){
                this.setState({
                    ...this.state,
                    message : "You should be above 18 years old",
                });
            }else{
                // Axios ka post request daalna hai 
                Axios.post("http://localhost:9000/p2pLending/CompleteProfile", {
                    first_name : this.state.first_name,
                    last_name : this.state.last_name,
                    gender : this.state.gender,
                    DOB : this.state.DOB,
                    city : this.state.city,
                    state : this.state.state,
                    country : this.state.country,
                    pincode : this.state.pincode,
                    address1 : this.state.address1,
                    address2 : this.state.address2,
                    email : localStorage.getItem('emailReg'),
                }).then((response) => {
                    console.log(response);
                    // console.log("Hiiii")
                if(response.data.success){
                    console.log("Completed profile");
                    window.location.href = "/p2pLending";
                }
                });
            }
        }
        else{
            this.setState({
                ...this.state,
                message : "Please fill all fields",
            });
        }
        
    }
	
    render(){

        let ProfileCompleted = this.state.ProfileCompleted;

        const renderProfileCompletedButton = () => {
            if (ProfileCompleted) {
              return (
                <>
                   
                </>
                );
            } else {
              return (
                <>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                        <h4 className="card-title">Complete your Profile</h4>
                        <h6 className='text-danger'>{this.state.message}</h6>
                        <div className="form-sample">
                            <p className="card-description">
                            Personal info
                            </p>
                            <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label" >First Name</label>
                                <div className="col-sm-9">
                                    <input required value={this.state.first_name} onChange={this.handleInputChanged.bind(this)} name="first_name" type="text" className="form-control" placeholder=''/>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Last Name</label>
                                <div className="col-sm-9">
                                    <input required value={this.state.last_name} onChange={this.handleInputChanged.bind(this)} name="last_name" type="text" className="form-control" />
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Gender</label>
                                <div className="col-sm-9">
                                    <select value={this.state.gender} onChange={this.handleInputChanged.bind(this)} name="gender"  className="form-control">
                                    <option >Select</option>
                                    <option >Male</option>
                                    <option>Female</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Date of Birth</label>
                                <div className="col-sm-9">
                                    <input type='date' required className="form-control" value={this.state.DOB} onChange={this.handleInputChanged.bind(this)} name="DOB"  placeholder="dd-mm-yyyy" />
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            {/* <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Category</label>
                                <div className="col-sm-9">
                                    <select className="form-control">
                                    <option>Category1</option>
                                    <option>Category2</option>
                                    <option>Category3</option>
                                    <option>Category4</option>
                                    </select>
                                </div>
                                </div>
                            </div> */}
                            {/* <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Membership</label>
                                <div className="col-sm-4">
                                    <div className="form-check">
                                    <label className="form-check-label">
                                        <input required type="radio" className="form-check-input" name="membershipRadios" id="membershipRadios1" defaultValue defaultChecked />
                                        Free
                                    </label>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="form-check">
                                    <label className="form-check-label">
                                        <input required type="radio" className="form-check-input" name="membershipRadios" id="membershipRadios2" defaultValue="option2" />
                                        Professional
                                    </label>
                                    </div>
                                </div>
                                </div>
                            </div> */}
                            </div>
                            <p className="card-description">
                            Address
                            </p>
                            <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Address 1</label>
                                <div className="col-sm-9">
                                    <input required type="text" value={this.state.address1} onChange={this.handleInputChanged.bind(this)} name="address1"  className="form-control" />
                                </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">State</label>
                                <div className="col-sm-9">
                                    <input required type="text" value={this.state.state} onChange={this.handleInputChanged.bind(this)} name="state" className="form-control" />
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Address 2</label>
                                <div className="col-sm-9">
                                    <input required type="text" value={this.state.address2} onChange={this.handleInputChanged.bind(this)} name="address2" className="form-control" />
                                </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Postcode</label>
                                <div className="col-sm-9">
                                    <input required type="text" maxlength="6" minlength="6" value={this.state.pincode} onChange={this.handleInputChanged.bind(this)} name="pincode"  className="form-control" />
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">City</label>
                                <div className="col-sm-9">
                                    <input required type="text"  value={this.state.city} onChange={this.handleInputChanged.bind(this)} name="city" className="form-control" />
                                </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Country</label>
                                <div className="col-sm-9">
                                    <select className="form-control" value={this.state.country} onChange={this.handleInputChanged.bind(this)} name="country" >
                                    <option >Select</option>
                                    <option >India</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                            </div>
                            <button onClick={this.handleButtonClicked.bind(this)} className="btn btn-primary me-2">Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
              );
            }
          }

        return (
            <>
                {renderProfileCompletedButton()}
            </>
            )
        }
    }

export default CompleteProfile;


   

