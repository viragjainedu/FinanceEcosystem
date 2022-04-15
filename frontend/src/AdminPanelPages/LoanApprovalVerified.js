
import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'
// import { Link } from 'react-router-dom';
import Axios from 'axios';



class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { requests: [],output : [],verified_output:[]};
	}

  callAPI() {

    Axios.get("http://localhost:9000/borrowing/requests", {
      }).then((response) => {
        // console.log(response);
        if(response.data){
          // console.log(response.data.result[0].email)
          this.setState({
              ...this.state,
              requests : response.data,
          } , () => {
            for (let i = 0; i < this.state.requests.length; i++) {
              Axios.post("http://localhost:9000/borrowing/details", {
                  email: this.state.requests[i].email,
              }).then((response) => {
                console.log(response)
                this.setState({
                  ...this.state,
                  output : [...this.state.output, response.data]
                })
                console.log(this.state)
              });
              
            }
          });       
          // console.log(this.state)     
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
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      Email
                    </th>
                    <th>
                      Calculate 
                    </th>
                    <th>
                      Amount 
                    </th>
                    <th>
                      Interest 
                    </th>
                    <th>
                      Months 
                    </th>
                    <th>
                      Send Mail 
                    </th>
                    <th>
                      Reject 
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.output.map((item,i) => 
                  {
                    if(this.state.requests.find(o => o.email === item.email).isAprroved ? true : false){
                      return(
                        <tr>
                        <td className="py-1">
                          {item.email}
                        </td>
                        <td>
                        <button onClick={(email) => this.handleButtonClickedCalculate(item.email)} className="btn btn-dark me-2">Calculate</button>
                        </td>
                        <td className="py-1">
                          
                        </td>
                        <td className="py-1">
                          
                        </td>
                        <td className="py-1">
                          
                        </td>
                        <td>
                          <button onClick={(email) => {if(window.confirm('Are you sure to send this mail?')){ this.handleButtonClickedSendMail(item.email)};}} className="btn btn-success me-2">Send</button>
                        </td>
                        <td>
                        <button onClick={(email) => {if(window.confirm('Are you sure to send this mail?')){ this.handleButtonClickedReject(item.email)};}} className="btn btn-danger me-2">Reject</button>
                        </td>
                      </tr>
                      );
                    }
                  }
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
