
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


  handleButtonClicked(email) {

    console.log(email);

    //Axios ka post request daalna hai 
      Axios.post(`http://localhost:9000/borrowing/approve`, {
        email : email,
    }).then((response) => {
      console.log(response);
      if(response.data.success){
        // window.location.href = "/LoanApproval";
      }
    });

  Axios.post(`http://localhost:9000/Mails/SendVerificationMail`, {
    email : email,
  }).then(res => {
    console.log(res);
  })
  
  
  window.location.href = "/LoanApprovalVerified";



    // window.location.href = "" + lend_amount;
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
            <h4 className="card-title">Unverified Borrowing Requests</h4>
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
                      Emp_length
                    </th>
                    <th>
                      Annual Income
                    </th>
                    <th>
                      Contact
                    </th>
                    <th>
                      Collateral
                    </th>
                    <th>
                      Purpose
                    </th>
                    <th>
                      isVerified?
                    </th>
                    <th>
                      Verify
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {this.state.output.map((item,i) => 
                  {
                  if(this.state.requests.find(o => o.email === item.email).isAprroved ? false : true){
                    return(
                      <tr>
                      <td className="py-1">
                        {item.email}
                      </td>
                      <td>
                        {item.emp_length}
                      </td>
                      <td>
                      {item.annual_income}
                      </td>
                      <td>
                        {item.contact}
                      </td>
                      <td>
                        {item.collateral}
                      </td>
                      <td>
                        {item.purpose}
                      </td>
                      <td>
                        {this.state.requests.find(o => o.email === item.email).isAprroved ? "True" : "False"}
                      </td>
                      <td>
                      <button onClick={(email) => {if(window.confirm('Are you sure to send verification mail?')){ this.handleButtonClicked(item.email)};}} className="btn btn-primary me-2">Verify</button>
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
