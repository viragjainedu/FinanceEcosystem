
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import Axios from 'axios';
import moment from 'moment'

class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { 
      withdrawals: [],
      message : "",
      current_balance : 0,
      withdrawal_amount: 0,
      original_otp : 0,
      entered_otp : -1,
    };
	}
	
	callAPI() {
    Axios.post("http://localhost:9000/withdrawal/getWithdrawals", {
      email: localStorage.getItem('emailReg'),
    }).then((response) => {
    
      console.log(response.data)
      if(response.data.length === 0){
        this.setState({
          ...this.state,
          message : "You've not withdrawed  yet"
        })
      }

      this.setState({
        ...this.state,
        withdrawals : response.data
      })

    })
	}
	
	componentWillMount() {
		this.callAPI();

    Axios.post("http://localhost:9000/account_stats/balance", {
        email: localStorage.getItem('emailReg'),
    }).then((response) => {
      console.log(response);
      if(response.data){
        this.setState({
          ...this.state,
          current_balance: response.data.total
        })            
    }
    });
	}

  
  handleInputChanged(event) {
    this.setState({
      ...this.state,
      [event.target.name] : event.target.value,
      request_submitted: false
    });
  }

  SendOTP() {
    Axios.post(`http://localhost:9000/SendOTP/CommonOTP`, {
      email : localStorage.getItem('emailReg'),
    }).then(res => {
      if(res.data){
        this.setState({
          ...this.state,
          original_otp : res.data
        })
      }
    })
  }

  handleButtonClickedWithdrawed() {
    
    if(this.state.withdrawal_amount <= 0 || this.state.withdrawal_amount > this.state.current_balance ){
      alert('Invalid amount')
    }else{
      // console.log(this.state)
      if(parseInt(this.state.entered_otp) === this.state.original_otp){
        Axios.post(`http://localhost:9000/withdrawal/withdraw`, {
          email : localStorage.getItem('emailReg'),
          withdrawal_amount : this.state.withdrawal_amount,
        }).then((response) => {
          // console.log(response);
          if(response.data.message){
            alert(response.data.message)
            window.location.href = "/withdrawal";
          }else{
            window.location.href = "/withdrawal";      
          }
        });
      }else{
        alert("Invalid OTP")
      }

    
    }
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

       
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">OTP Verification</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <input type="number" className="form-control" name='entered_otp' onChange={this.handleInputChanged.bind(this)} placeholder="Enter OTP" />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleButtonClickedWithdrawed.bind(this)} >Withdraw</button>
                      </div>
                    </div>
                  </div>
                </div>
              {/* Modal */}

                  <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">

                      <h4 class="card-title">Withdraw Money</h4>
                      <p class="card-description">
                        Current Balance - ₹ {this.state.current_balance}
                      </p>

                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-primary text-white">₹</span>
                        </div>
                        <input type="number" className="form-control" name='withdrawal_amount' value={this.state.withdrawal_amount}  onChange={this.handleInputChanged.bind(this)}  aria-label="Amount (to the nearest rupees)" />
                        <div class="input-group-append">
                          {/* <button class="btn btn-sm btn-primary" onClick={this.handleButtonClickedWithdrawed.bind(this)} type="button">Withdraw</button>
                          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Launch demo modal
                          </button> */}
                          <button class="btn btn-sm btn-primary" type="button" data-toggle="modal" onClick={this.SendOTP.bind(this)} data-target="#exampleModal">Withdraw</button>
                        </div>
                      </div>
                    </div>
  
                    </div>
                  </div>
                </div>

                  <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Withdrawals</h4>
                        <p class="card-description text-danger">
                          {this.state.message}
                        </p>
                        <p class="card-description text-success">
                          
                        </p>
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>Withdrawal Amount</th>
                                <th>Withdrawal Date</th>
                                <th>Withdrawal Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.withdrawals.map( (item) => 
                                <tr>
                                  <td>₹ {item.amount_withdrawn}</td>
                                  <td>{moment(item.withdrawal_time).format('DD-MM-YYYY')}</td>
                                  <td>{moment(item.withdrawal_time).format('HH:mm:ss')}</td>
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
