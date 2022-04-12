
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
// import { Link } from 'react-router-dom';
import Axios from 'axios';

class App extends Component {
   
    constructor(props) {
		super(props);
        this.state = {
            ProfileCompleted : false,
            emp_length : "",
            home_ownership : "",
            annual_income : "",
            contact : "",
            purpose : "",
            message : "",
        };
	}

     //To check whether user has completed form or not
     callAPI() {
        Axios.post("http://localhost:9000/borrowing/isProfileComplete", {
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
        console.log(this.state)
        
        if(this.state.emp_length !== "" && this.state.home_ownership !== "" && this.state.purpose !== "" && this.state.contact !== "" && this.state.annual_income !== ""){
            //Axios ka post request daalna hai 
            Axios.post("http://localhost:9000/borrowing/CompleteProfile", {
                emp_length : this.state.emp_length,
                home_ownership : this.state.home_ownership,
                purpose : this.state.purpose,
                contact : this.state.contact,
                annual_income : this.state.annual_income,
                email : localStorage.getItem('emailReg'),
            }).then((response) => {
                console.log(response);
                // console.log("Hiiii")
            if(response.data.success){
                console.log("Completed profile");
                window.location.href = "/borrowing";
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
	
	
  render() {
    let ProfileCompleted = this.state.ProfileCompleted;

    const renderProfileCompletedButton = () => {
        if (ProfileCompleted) {
          return (
            <>
            <div className="container-scroller"> 
                <TopNavbar/>
                <div className="container-fluid page-body-wrapper">
                    <RightNavbar/>
                    <LeftNavbar/>
                    <div className="main-panel">
                    <div className="content-wrapper">
                        <MainHeader name="Borrowing"/>
                        <p>Profile Completed</p>
                    </div>
                    
                    </div>
                </div>
                
                </div>
              <p>Profile Completed </p> 
            </>
            );
        } else {
            return(
                <>

                <div className="container-scroller"> 
                <TopNavbar/>
                <div className="container-fluid page-body-wrapper">
                    <RightNavbar/>
                    <LeftNavbar/>
                    <div className="main-panel">
                    <div className="content-wrapper">
                        <MainHeader name="Borrowing"/>
                        {/* <br></br>
                        <h3>{this.state.apiResponse}</h3>
                        <br></br> */}
                        {/* <CompleteProfile/> */}
                                            
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                <h4 className="card-title">Enter Required Information</h4>
                                <div className="form-sample">
                                    <p className="card-description">
                                    Personal info
                                    </p>
                                    <h6 className='text-danger'>{this.state.message}</h6>
                                    <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Emp Length</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={this.state.emp_length} onChange={this.handleInputChanged.bind(this)} name="emp_length" className="form-control" placeholder=''/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Home Ownership</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={this.state.home_ownership} onChange={this.handleInputChanged.bind(this)} name="home_ownership" className="form-control" />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Annual Income</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={this.state.annual_income} onChange={this.handleInputChanged.bind(this)} name="annual_income" className="form-control" />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Purpose</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={this.state.purpose} onChange={this.handleInputChanged.bind(this)} name="purpose" className="form-control" />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Contact</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={this.state.contact} onChange={this.handleInputChanged.bind(this)} name="contact" className="form-control" />
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <button onClick={this.handleButtonClicked.bind(this)} className="btn btn-primary me-2">Submit</button>


                                </div>
                                </div>
                            </div>
                        </div>
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

export default App;
