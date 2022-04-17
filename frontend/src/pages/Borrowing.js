
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
// import { Link } from 'react-router-dom';
import Axios from 'axios';
import ProposedLoans from '../components/ProposedLoans'

class App extends Component {
   
    constructor(props) {
		super(props);
        this.state = {
            ProfileCompleted : false,
            emp_length : "",
            annual_income : "",
            contact : "",
            collateral : "",
            collateral_value : "",
            amount_req : "",
            age : "",
            purpose : "",
            message : "",
            status : 0,
            isLoanCalculatedForThisEmail : false
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
                            annual_income : response.data.annual_income,
                            contact : response.data.contact,
                            purpose : response.data.purpose,
                            collateral : response.data.collateral,
                            amount_req : response.data.amount_req,
                            collateral_value : response.data.collateral_value,
                            age : response.data.age
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
    
    isLoanCalculatedForThisEmail() {
        Axios.post("http://localhost:9000/borrowing/isLoanCalculatedForThisEmail", {
            email: localStorage.getItem('emailReg'),
        }).then((res)=>{
            if(res.data.Calculated){
                this.setState({
                    ...this.state,
                    isLoanCalculatedForThisEmail : true       
                })
            }
        })
    }
    
	componentWillMount() {
		this.callAPI();
        this.getStatus();
        this.isLoanCalculatedForThisEmail(localStorage.getItem('emailReg'));
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
        
        if(this.state.emp_length !== "" &&  this.state.purpose !== "" &&  this.state.age !== "" &&  this.state.amount_req !== ""&&  this.state.collateral_value !== "" &&  this.state.collateral !== "" && this.state.contact !== "" && this.state.annual_income !== ""){
            //Axios ka post request daalna hai 
            Axios.post("http://localhost:9000/borrowing/CompleteProfile", {
                emp_length : this.state.emp_length,
                purpose : this.state.purpose,
                contact : this.state.contact,
                collateral : this.state.collateral,
                collateral_value : this.state.collateral_value,
                amount_req : this.state.amount_req,
                age : this.state.age,
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
                            <br/>
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
                                            Purpose
                                            </th>
                                            <th>
                                            Collateral
                                            </th>
                                            <th>
                                            Collateral_Value
                                            </th>
                                            <th>
                                            Amount Required
                                            </th>
                                            <th>
                                            Age
                                            </th>
                                            <th>
                                            Contact
                                            </th>
                                            <th>
                                            Annual Income(in lacs)
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td className="py-1">
                                            {this.state.emp_length} years
                                            </td>
                                            <td className="py-1">
                                                {this.state.purpose}
                                            </td>
                                            <td className="py-1">
                                                {this.state.collateral}
                                            </td>
                                            <td className="py-1">
                                            ₹   {this.state.collateral_value} lacs
                                            </td>
                                            <td className="py-1">
                                            ₹   {this.state.amount_req} 
                                            </td>
                                            <td className="py-1">
                                                {this.state.age}
                                            </td>
                                            <td className="py-1">
                                                {this.state.contact}
                                            </td>
                                            <td className="py-1">
                                            ₹  {this.state.annual_income} lacs
                                            </td>
                                            </tr>  
                                        
                                        </tbody>
                                    </table>
                                        
                                    </div>
                                </div>
                                </div>
                                <br></br>
                            </div>
                        {(()=>{
                            if(this.state.isLoanCalculatedForThisEmail){
                                return <ProposedLoans/>
                            }
                        })()}
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
                                        <label className="col-sm-3 col-form-label">No of years of Employment</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={this.state.emp_length} onChange={this.handleInputChanged.bind(this)} name="emp_length" className="form-control" placeholder='0 if not started working yet.'/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Annual Income(In lacs)</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={this.state.annual_income} onChange={this.handleInputChanged.bind(this)} name="annual_income" className="form-control" placeholder='Type 6 if 6 lacs' />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Purpose</label>
                                        <div className="col-sm-9">
                                            <select onChange={this.handleInputChanged.bind(this)} name="purpose" className="form-control">
                                                <option value="">Select</option>
                                                <option value="Education">Education</option>
                                                <option value="House">House</option>
                                                <option value="Business">Business</option>
                                                <option value="Medical">Medical</option>
                                                <option value="Car">Car</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Collateral type</label>
                                        <div className="col-sm-9">
                                            <select onChange={this.handleInputChanged.bind(this)} name="collateral" className="form-control">
                                                <option value="">Type</option>
                                                <option value="House">House</option>
                                                <option value="Commerical">Commerical</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Contact</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={this.state.contact} onChange={this.handleInputChanged.bind(this)} name="contact" className="form-control" placeholder='9869101921' />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Age</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={this.state.age} onChange={this.handleInputChanged.bind(this)} name="age" className="form-control" placeholder='Type 30 for 30 years.' />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Collateral Value(in lacs)</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={this.state.collateral_value} onChange={this.handleInputChanged.bind(this)} name="collateral_value" className="form-control" placeholder='Type 5 for 5 lacs'/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Amount Required</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={this.state.amount_req} onChange={this.handleInputChanged.bind(this)} name="amount_req" className="form-control" placeholder='30000'/>
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

