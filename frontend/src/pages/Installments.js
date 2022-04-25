
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import Axios from 'axios';

class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { installments: [], message : ""};
	}
	
	callAPI() {
    Axios.post("http://localhost:9000/installments/getInstallments", {
      email: localStorage.getItem('emailReg'),
    }).then((response) => {
    
      console.log(response.data)
      if(response.data.length === 0){
        this.setState({
          ...this.state,
          message : "You've not borrowed any loan yet"
        })
      }
      this.setState({
        ...this.state,
        installments : response.data
      })
    })
	}
	
	componentWillMount() {
		this.callAPI();
	}


  render() {
  return (
    <>

        <div className="container-scroller"> 
          <TopNavbar/>
          <div className="container-fluid page-body-wrapper">
            <RightNavbar/>
            <LeftNavbar/>
            <div className="main-panel">
              <div className="content-wrapper">
                <MainHeader name="Installments"/>
                  <br></br>
                  <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Installments</h4>
                        <p class="card-description text-danger">
                          {this.state.message}
                        </p>
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>Installment No</th>
                                <th>Amount Borrowed</th>
                                <th>Interest Rate</th>
                                <th>Installment Amount</th>
                                <th>Date of Loan Transaction</th>
                                <th>Date of Payment</th>
                                <th>Status</th>
                                <th>Pay</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.installments.map( (item) => 
                                <tr>
                                  <td>{item.installment_no}</td>
                                  <td>₹ {item.amount_borrowed}</td>
                                  <td>{item.interest_rate} % </td>
                                  <td>₹ {item.installment_amount} </td>
                                  <td>{item.date_of_loan_transaction} </td>
                                  <td>{item.date_of_loan_transaction} </td>
                                  <td class="text-success">{item.status}</td>
                                  <td class="text-success">{item.status}</td>
                                </tr>                                                                    
                                )}

                            </tbody>
                          </table>
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

export default App;
