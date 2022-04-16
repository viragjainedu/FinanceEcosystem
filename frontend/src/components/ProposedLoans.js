
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

class CompleteProfile extends Component {
	
	constructor(props) {
		super(props);
        this.state = {
            Loans : {},
        };
	}

    //To check whether user has completed form or not
    callAPI() {
        Axios.post("http://localhost:9000/borrowing/ProposedLoansForEmail", {
            email: localStorage.getItem('emailReg'),
        }).then((response) => {
          console.log(response);
          if(response.data){
              console.log(response.data)
            this.setState({
                ...this.state,
                Loans : response.data,
            });            
          }
        });
	}
	
	componentWillMount() {
		this.callAPI();
	} 
    
    handleButtonClicked() {
        // var first_name = this.state.first_name;
        // console.log(this.state)
        
        // if(this.state.first_name !== "" && this.state.last_name !== "" && this.state.DOB !== "" && this.state.gender !== "" && this.state.address1 !== ""
        //     && this.state.address2 !== "" && this.state.city !== "" && this.state.state !== "" && this.state.country !== "" && this.state.pincode !== ""     
        // ){
        //     //Axios ka post request daalna hai 
        //     Axios.post("http://localhost:9000/p2pLending/CompleteProfile", {
        //         first_name : this.state.first_name,
        //         last_name : this.state.last_name,
        //         gender : this.state.gender,
        //         DOB : this.state.DOB,
        //         city : this.state.city,
        //         state : this.state.state,
        //         country : this.state.country,
        //         pincode : this.state.pincode,
        //         address1 : this.state.address1,
        //         address2 : this.state.address2,
        //         email : localStorage.getItem('emailReg'),
        //     }).then((response) => {
        //         console.log(response);
        //         // console.log("Hiiii")
        //     if(response.data.success){
        //         console.log("Completed profile");
        //         window.location.href = "/p2pLending";
        //     }
        //     });
        // }
        // else{
        //     this.setState({
        //         ...this.state,
        //         message : "Please fill all fields",
        //     });
        }    
	
    render(){
        return (
            <>
        <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Loan Proposals</h4>
            <p className="card-description">
              
            </p>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      Months
                    </th>
                    <th>
                      Amount 
                    </th>
                    <th>
                      Interest 
                    </th>
                    <th>
                      Accept
                    </th>
                  </tr>
                </thead>
                <tbody> 
                        <tr>
                            {console.log(this.state.Loans)}
                            <td>3 Months</td>
                            <td className="py-1">
                            ₹{this.state.Loans.amount1 }
                            </td>
                            <td className="py-1">
                            ₹{this.state.Loans.interest1 }
                            </td>  
                            <td>
                                <button onClick={(email) => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoan(this.state.Loans.email)};}} className="btn btn-success me-2">Accept</button>
                            </td>
                        </tr>
                        <tr>
                            <td>6 Months</td>
                            <td className="py-1">
                            ₹{this.state.Loans.amount2 }
                            </td>
                            <td className="py-1">
                            ₹{this.state.Loans.interest2 }
                            </td>  
                            <td>
                                <button onClick={(email) => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoan(this.state.Loans.email)};}} className="btn btn-success me-2">Accept</button>
                            </td>
                        </tr>
                        <tr>
                            <td>12 Months</td>
                            <td className="py-1">
                            ₹{this.state.Loans.amount3 }
                            </td>
                            <td className="py-1">
                            ₹{this.state.Loans.interest3 }
                            </td>  
                            <td>
                                <button onClick={(email) => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoan(this.state.Loans.email)};}} className="btn btn-success me-2">Accept</button>
                            </td>
                        </tr>
                        <tr>
                            <td>18 Months</td>
                            <td className="py-1">
                            ₹{this.state.Loans.amount4 }
                            </td>
                            <td className="py-1">
                            ₹{this.state.Loans.interest4 }
                            </td>  
                            <td>
                                <button onClick={(email) => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoan(this.state.Loans.email)};}} className="btn btn-success me-2">Accept</button>
                            </td>
                        </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
        
            </>
            )
        }
    }

export default CompleteProfile;


   

