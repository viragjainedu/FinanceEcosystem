
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
            status : 0
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
                },() => {
                    Axios.post("http://localhost:9000/borrowing/profile_info", {
                        email: localStorage.getItem('emailReg'),
                    }).then((response) => {
                      console.log(response);
                      if(response.data){
                        this.setState({
                            ...this.state,
                            emp_length : response.data.emp_length,
                            home_ownership : response.data.home_ownership,
                            annual_income : response.data.annual_income,
                            contact : response.data.contact,
                            purpose : response.data.purpose
                        });            
                    }
                  });
                });            
            }
          }
        });
	}
	

    getStatus() {
        Axios.post("http://localhost:9000/borrowing/getStatus", {
            email: localStorage.getItem('emailReg'),
        }).then((res)=>{
            // console.log(res.data);
            this.setState({
                ...this.state,
                status : res.data.status
            })
        })
    }
    
	componentWillMount() {
		this.callAPI();
        this.getStatus();
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

    BorrowingChart(){
        return(
    <>
        <div class="col-12 grid-margin stretch-card">
            <div class="card card-rounded">
                <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h4 class="card-title card-title-dash">Borrowing Flow Chart</h4>
                    <p class="mb-0 card-title">Status</p>
                </div>
                <ul class="bullet-line-list">
                    <li>
                    <div class="d-flex justify-content-between">
                        <div>Profile Details Submission</div>
                        <p>{(() => {if(this.state.status > 0) {return 'Completed';}else{return 'Pending'}})()}</p>
                    </div>
                    </li>
                    <li>
                    <div class="d-flex justify-content-between">
                        <div>Profile Details Verification</div>
                        <p>{(() => {if(this.state.status > 1) {return 'Completed';}else{return 'Pending'}})()}</p>
                    </div>
                    </li>
                    <li>
                    <div class="d-flex justify-content-between">
                        <div>Loan Amount and Interest Proposal</div>
                        <p>{(() => {if(this.state.status > 2) {return 'Completed';}else{return 'Pending'}})()}</p>
                    </div>
                    </li>
                    <li>
                    <div class="d-flex justify-content-between">
                        <div>Acceptance/Rejection</div>
                        <p>{(() => {if(this.state.status > 3) {return 'Completed';}else{return 'Pending'}})()}</p>
                    </div>
                    </li>                                  
                </ul>
                <div class="list align-items-center pt-3">
                    <div class="wrapper w-100">
                    <p class="mb-0">
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
        );
    
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
                            <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Profile Information</h4><p>We've recieved your profile information and is under our evaluation.</p>
                                    <p className="card-description">
                                    
                                    </p>
                                    <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>
                                            Employee Length
                                            </th>
                                            <th>
                                            Home Ownership
                                            </th>
                                            <th>
                                            Purpose
                                            </th>
                                            <th>
                                            Contact
                                            </th>
                                            <th>
                                            Annual Income
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td className="py-1">
                                            {this.state.emp_length}
                                            </td>
                                            <td className="py-1">
                                                {this.state.home_ownership}
                                            </td>
                                            <td className="py-1">
                                                {this.state.purpose}
                                            </td>
                                            <td className="py-1">
                                                {this.state.contact}
                                            </td>
                                            <td className="py-1">
                                            ₹  {this.state.annual_income}
                                            </td>
                                            </tr>  
                                        
                                        </tbody>
                                    </table>
                                        
                                    </div>
                                </div>
                                </div>
                            </div>
                        {this.BorrowingChart()}
                        </div>
                    </div>
                </div>
            </div>
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
                        {this.BorrowingChart()}
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

