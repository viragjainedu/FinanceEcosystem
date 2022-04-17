
import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'
// import { Link } from 'react-router-dom';
import Axios from 'axios';



class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { verified_output:[] };
	}

  callAPI() {

    Axios.get("http://localhost:9000/borrowing/ProposedLoansForVerified", {
      }).then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          this.setState({
            ...this.state,
            verified_output : [...this.state.verified_output , response.data[i]]
          })    
        }
    });    
  }

  componentWillMount() {
    this.callAPI();
    
  } 

  handleButtonClickedReject(email) {

    console.log(email);

    //Axios ka post request daalna hai 
      Axios.post(`http://localhost:9000/borrowing/reject`, {
        email : email,
    }).then((response) => {
      console.log(response);
      // console.log("Hiiii")
      if(response.data.success){
        window.location.href = "/LoanApprovalUnverified";
      }
    });

    // window.location.href = "" + lend_amount;
  }

  handleButtonClickedSendMail(email) {
    Axios.post(`http://localhost:9000/Mails/SendProposedLoansMail`, {
      email : email,
  }).then((response) => {
    console.log(response);
    if(response.data.success){
      alert("Mail Sent")
    }
    else if(response.data.status){
      alert(response.data.status)
      window.location.href = "/LoanApprovalVerified";
    }
    else{
      alert("There is some err")
    }

  });

  }

  handleButtonClickedCalculate(email) {
    Axios.post(`http://localhost:9000/borrowing/calculate`, {
      email : email,
  }).then((response) => {
    console.log(response);

    var CalculatedVerifiedOutput = []
    for (let i = 0; i < response.data.length; i++) {
      CalculatedVerifiedOutput.push(response.data[i])  
    }

    this.setState({
      ...this.state,
      verified_output : CalculatedVerifiedOutput
    })
  });

  }

  render() {
    // console.log(this.state);
  return (
    <>

        <div className="container-scroller"> 
          <TopNavbarAdmin/>
          <div className="container-fluid page-body-wrapper">
            <LeftNavbarAdmin/>
            <div className="main-panel">
              {/* {this.state.result.email} */}
              

      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Verified Borrowing Requests</h4>
            <p className="card-description">
              
            </p>
            <div className="table-responsive">
              <table className="table table-striped" >
                <thead>
                  <tr>
                    <th>
                      Email
                    </th>
                    <th>
                      Calculate 
                    </th>
                    <th>
                      3 Months 
                    </th>
                    <th>
                      6 Months 
                    </th>
                    <th>
                      12 Months
                    </th>
                    <th>
                      18 Months
                    </th>
                    <th>
                      Send Mail 
                    </th>
                    <th>
                      Reject 
                    </th>
                    <th>
                      Selected 
                    </th>
                    <th>
                      Transact 
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(this.state.verified_output)}
                  {this.state.verified_output.map((item,i) => 
                        <tr>
                        <td className="py-1">
                          {item.email}
                        </td>
                        <td>
                        <button onClick={(email) => this.handleButtonClickedCalculate(item.email)} className="btn btn-dark me-2">Calculate</button>
                        </td>
                        <td className="py-1">
                          ₹{item.amount1 } at {item.interest1}%
                        </td>
                        <td className="py-1">
                          ₹{item.amount2 } at {item.interest2}%                          
                        </td>
                        <td className="py-1">
                          ₹{item.amount3 } at {item.interest3}%                          
                        </td>
                        <td className="py-1">
                          ₹{item.amount4 } at {item.interest4}%                          
                        </td>
                        
                        {(() => {
                          if(item.MailSent){return <td className="py-1">Mail Sent</td>}
                          else{
                            return (
                            <td>
                              <button onClick={(email) => { this.handleButtonClickedSendMail(item.email)}} className="btn btn-success me-2">Send</button>
                            </td>
                            )
                          }
                        })()}

                          
                        <td>
                        <button onClick={(email) => {if(window.confirm('Are you sure to Reject this mail?')){ this.handleButtonClickedReject(item.email)};}} className="btn btn-danger me-2">Reject</button>
                        </td>
                        {(() => {
                          if(item.MailSent && item.selected !== 0 ){
                            return (
                              <td className="py-1" style={{color: "green"}}>
                                Selected {item.selected*3} Months
                              </td>
                            )
                          }else{
                            return(
                              <td className="py-1" style={{color: "red"}}>
                               Not Selected
                            </td>
                            )
                          }
                        })()}
                        <td>
                        <button onClick={(email) => {if(window.confirm('Are you sure to Transact Loan amount?')){ this.handleButtonClickedTransact(item.email)};}} className="btn btn-primary me-2">Transact</button>
                        </td>
                      </tr>
                  )}
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
              <p></p>
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
