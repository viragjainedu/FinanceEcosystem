
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
    if(response.data.message){
      alert(response.data.message)
    }else{
      var CalculatedVerifiedOutput = []
      for (let i = 0; i < response.data.length; i++) {
        CalculatedVerifiedOutput.push(response.data[i])  
      }
  
      this.setState({
        ...this.state,
        verified_output : CalculatedVerifiedOutput
      })
    }
  });

  }

  handleButtonClickedTransact(email,selected,rejected,amount) {

    Axios.post(`http://localhost:9000/borrowing/transact`, {
      email : email,
      selected : selected,
      rejected : rejected,
      amount : amount,
  }).then((response) => {
    // console.log(response);
    if(response.data.message){
      alert(response.data.message)
    }else{
      window.location.href = "/LoanApprovalVerified";
    }
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
                     No of Months 
                    </th>
                    <th>
                     Amount 
                    </th>
                    <th>
                     Interest 
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
                          {(()=>{
                            if(item.isCalculated === 1){
                              return (
                                <td className="py-1">
                                  Calculated Already
                                </td>    
                              )
                            }else{
                              return(
                              <td>
                              <button onClick={(email) => this.handleButtonClickedCalculate(item.email)} className="btn btn-dark me-2">Calculate</button>
                              </td>
                              )
                            }
                          })()}
                        
                        <td className="py-1">
                          {item.month_req } 
                        </td>
                        <td className="py-1">
                          ₹{item.amount1 } 
                        </td>

                        <td className="py-1">
                          {item.interest1}%
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
                          if(item.selected !== 0 && item.rejected === null ){
                            return (
                              <td className="py-1" style={{color: "green"}}>
                                Accepted {item.selected}
                              </td>
                            )
                          }else if (item.selected === 0 && item.rejected === null){
                            return(
                              <td className="py-1" style={{color: "blue"}}>
                               Not Accepted Yet
                            </td>
                            )
                          }else if(item.rejected === 1){
                            return(
                              <td className='py-1' style={{color: "red"}}>
                                Rejected
                              </td>
                            )
                          }
                        })()}

                        {(()=>{
                          if(item.isTransacted){
                            return(
                              <td className="py-1">Transacted</td>
                            )
                          }
                          else{
                            return(
                              <td>
                              <button onClick={(email) => {if(window.confirm('Are you sure to Transact Loan amount?')){ this.handleButtonClickedTransact(item.email,item.selected,item.rejected,item.amount1)};}} className="btn btn-primary me-2">Transact</button>
                              </td>                                    
                            )
                          }
                        })()}
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
