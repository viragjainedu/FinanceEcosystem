
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import CompleteProfile from '../components/CompleteProfile';
import Axios from 'axios';


class App extends Component {

	constructor(props) {
		super(props);
    this.state = {  
      lend_amount: 0,
      lock_in_period: 0,
      request_submitted: false, 
      ProfileCompleted: false, 
      lending_transactions : [],
      message : "",
      debitFrom : "",
      riskApetite: ""
    };
	}

	 //To check whether user has completed form or not
   callAPI() {

      Axios.post("http://localhost:9000/p2pLending/isProfileComplete", {
            email: localStorage.getItem('emailReg'),
        }).then((response) => {
          console.log(response);
          // console.log("Hiiii")
          if(response.data.result){
            if(response.data.result === true){
                this.setState({
                    ...this.state,
                    ProfileCompleted : true,
                });            
            }
        }
      });
      
      Axios.post("http://localhost:9000/p2pLending/lending_transactions", {
            email: localStorage.getItem('emailReg'),
        }).then((response) => {
          console.log(response);
          // console.log("Hiiii")
          if(response.data){
            this.setState({
                ...this.state,
                lending_transactions : response.data,
            });            
        }
      });

    }

    componentWillMount() {
      this.callAPI();
    } 

  
  handleInputChanged(event) {
    this.setState({
      ...this.state,
      [event.target.name] : event.target.value,
      request_submitted: false
    });
  }

  handleButtonClicked() {
    
    if(this.state.lock_in_period !== 0 && this.state.lend_amount !== 0  && this.state.debitFrom !== "" && this.state.riskApetite !== "" ){
      this.setState({
        ...this.state,
        request_submitted: true,
      });
      // console.log(this.state)
      window.location.href  = `/Payment?amount=${this.state.lend_amount}&lock_in_period=${this.state.lock_in_period}&debitFrom=${this.state.debitFrom}&riskApetite=${this.state.riskApetite}`;         
    }else{
      this.setState({
        ...this.state,
        message : "Please Fill all fields"
      })
    }


    // //Axios ka post request daalna hai 
    //   Axios.post("http://localhost:9000/p2pLending", {
    //     request_submitted: true,
    //     lend_amount: lend_amount,
    // }).then((response) => {
    //   console.log(response);
    //   // console.log("Hiiii")
    //   if(response.data.message){
    //     window.location.href = "/";
    //   }
    // });

    // window.location.href = "" + lend_amount;
  }

  render() {

    let request_submitted = this.state.request_submitted;

    const renderRequestSubmittedButton = () => {
      if (request_submitted) {
        return (
          <>
            <p>Request submitted... We're Processing your request based on given information , 
            Lending amount -  {this.state.lend_amount} </p> 
          </>
          );
      } else {
        return (
          <>
          <br></br>
          <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Lending</h4>
                  <p className="card-description text-danger">
                      {this.state.message}
                  </p>
                  <div className="form-group row">
                    <div className="col">
                      <label>How much you offer to lend</label>
                      <div id="the-basics">
                        <input className="typeahead" name='lend_amount' value={this.state.lend_amount} onChange={this.handleInputChanged.bind(this)} type="number" min="10000" max="1000000" step={10000} placeholder="1000" />
                      </div>
                    </div>
                    </div>

                    <div className="form-group row">
                      <div className="col">
                      <label>No of Months to Lent</label>
                          <select name='lock_in_period' onChange={this.handleInputChanged.bind(this)}  className="form-control">
                              <option value="">Select</option>
                              <option value="3">3 Months</option>
                              <option value="6">6 Months</option>
                              <option value="12">12 Months</option>
                              <option value="18">18 Months</option>
                          </select>
                        </div>
                      </div>
                    <div className="form-group row">
                      <div className="col">
                      <label>Debit Money From</label>
                          <select name='debitFrom' onChange={this.handleInputChanged.bind(this)}  className="form-control">
                              <option value="">Debit From</option>
                              <option value="bank">Bank Account</option>
                              <option value="balance">Balance</option>
                          </select>
                        </div>
                      </div>
                    <div className="form-group row">
                      <div className="col">
                      <label>Select Risk Apetite</label>
                          <select name='riskApetite' onChange={this.handleInputChanged.bind(this)}  className="form-control">
                              <option value="">Risk Apetite</option>
                              <option value="high">High Risk</option>
                              <option value="moderate">Moderate Risk</option>
                              <option value="low">Low Risk</option>
                          </select>
                        </div>
                      </div>
                    
                  <button onClick={this.handleButtonClicked.bind(this)} className="btn btn-primary me-2">Submit</button>
                </div>
              </div>
            </div>

            <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Previous Lending transactions</h4>
            <p className="card-description">
              
            </p>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      Amount
                    </th>
                    <th>
                      Time
                    </th>
                    <th>
                      Period
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lending_transactions.map((item,i) => 
                    <tr>
                      <td className="py-1">
                       ₹ {item.amount_lent}
                      </td>
                      <td className="py-1">
                        {item.transaction_time}
                      </td>
                      <td className="py-1">
                        {item.lock_in_period} Months
                      </td>
                    </tr>  
                  )} 
                
                </tbody>
              </table>
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

        <div className="container-scroller"> 
          <TopNavbar/>
          <div className="container-fluid page-body-wrapper">
            <RightNavbar/>
            <LeftNavbar/>
            <div className="main-panel">
              <div className="content-wrapper">
                <MainHeader name="P2P Lending"/>
                {/* <br></br>
                <h3>{this.state.apiResponse}</h3>
                <br></br> */}
                {this.state.ProfileCompleted ? renderRequestSubmittedButton() : ''}
                <CompleteProfile/>

              </div>
              
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
