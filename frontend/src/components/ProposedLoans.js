
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

class CompleteProfile extends Component {
	
	constructor(props) {
		super(props);
        this.state = {
            Loans : {},
            message : "Please Choose a Loan"
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
            },()=>{
              if(this.state.Loans.selected !== 0){
                this.setState({
                  ...this.state,
                  message : "Thank you for selecting the Loan. Loan amount will be transacted shortly."
                })
              }
            });            
          }
        });
	}
	
	componentWillMount() {
		this.callAPI();
	} 
    
  handleButtonClickedAcceptLoans(selectedLoan) {

      //Axios ka post request daalna hai 
      Axios.post("http://localhost:9000/borrowing/LoanSelection", {
          selectedLoan : selectedLoan,
          email : localStorage.getItem('emailReg'),
      }).then((response) => {
          console.log(response);
        if(response.data.status === "Accepted"){
          window.location.href = "/borrowing";
        }
      });
    }
    
    render(){
        return (
            <>
        <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Loan Proposals</h4>
            
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
                            {this.state.Loans.interest1 } %
                            </td>  
                            {(() => {

                              if(this.state.Loans.selected === 0){
                                return(
                                  <td>
                                    <button onClick={() => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoans(1)};}} className="btn btn-success me-2">Accept</button>
                                  </td>
                                )
                              }
                              else if(this.state.Loans.selected === 1){
                                return (
                                  <td className="py-1" style={{color: "green"}}>Accpeted</td>
                                )    
                              }else{
                                return <td className="py-1" style={{color: "red"}}>Declined</td>
                              }
                            })()}

                        </tr>
                        <tr>
                            <td>6 Months</td>
                            <td className="py-1">
                            ₹{this.state.Loans.amount2 }
                            </td>
                            <td className="py-1">
                            {this.state.Loans.interest2 } %
                            </td>  
                            {(() => {

                              if(this.state.Loans.selected === 0){
                                return(
                                  <td>
                                    <button onClick={() => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoans(2)};}} className="btn btn-success me-2">Accept</button>
                                  </td>
                                )
                              }
                              else if(this.state.Loans.selected === 2){
                                return (
                                  <td className="py-1" style={{color: "green"}}>Accpeted</td>
                                )    
                              }else{
                                return <td className="py-1" style={{color: "red"}}>Declined</td>
                              }
                            })()}

                        </tr>
                        <tr>
                            <td>12 Months</td>
                            <td className="py-1">
                            ₹{this.state.Loans.amount3 }
                            </td>
                            <td className="py-1">
                            {this.state.Loans.interest3 } %
                            </td>  
                            {(() => {

                              if(this.state.Loans.selected === 0){
                                return(
                                  <td>
                                    <button onClick={() => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoans(3)};}} className="btn btn-success me-2">Accept</button>
                                  </td>
                                )
                              }
                              else if(this.state.Loans.selected === 3){
                                return (
                                  <td className="py-1" style={{color: "green"}}>Accpeted</td>
                                )    
                              }else{
                                return <td className="py-1" style={{color: "red"}}>Declined</td>
                              }
                            })()}

                        </tr>
                        <tr>
                            <td>18 Months</td>
                            <td className="py-1">
                            ₹{this.state.Loans.amount4 }
                            </td>
                            <td className="py-1">
                            {this.state.Loans.interest4 } %
                            </td>  
                            {(() => {

                              if(this.state.Loans.selected === 0){
                                return(
                                  <td>
                                    <button onClick={() => {if(window.confirm('Are you sure to Accept this Loan?')){ this.handleButtonClickedAcceptLoans(4)};}} className="btn btn-success me-2">Accept</button>
                                  </td>
                                )
                              }
                              else if(this.state.Loans.selected === 4){
                                return (
                                  <td className="py-1" style={{color: "green"}}>Accpeted</td>
                                )    
                              }else{
                                return <td className="py-1" style={{color: "red"}}>Declined</td>
                              }
                            })()}

                        </tr>
                  
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                  <p className="card-description" style={{color : "green"}}>
                    {this.state.message}
                  </p>
                </div>
            </div>
          </div>
        </div>
    </div>
        
            </>
            )
        }
    }

export default CompleteProfile;


   

