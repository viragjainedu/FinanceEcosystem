
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import './css/Payment.css';
import Axios from 'axios';


class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { amount: 0 };
	}
	
	callAPI() {
		// fetch("http://localhost:9000/searchResult")
		// 	.then(res => res.text())
		// 	.then(res => this.setState({ apiResponse: res }));

    const search = window.location.search;
    const query = new URLSearchParams(search);
    const amount = query.get('amount');
    const lock_in_period = query.get('lock_in_period');
    const debitFrom = query.get('debitFrom');
      this.setState({
        amount: amount,
        lock_in_period: lock_in_period,
        debitFrom: debitFrom,
      })
	}
	
	componentWillMount() {
		this.callAPI();
	}

  handleButtonClicked() {
    var amount = this.state.amount;
    var lock_in_period = this.state.lock_in_period;
    var debitFrom = this.state.debitFrom;
    
    //Axios ka post request daalna hai 
      Axios.post("http://localhost:9000/p2pLending/amount_lending", {
        email: localStorage.getItem('emailReg'),
        amount: amount,
        lock_in_period: lock_in_period,
        debitFrom: debitFrom,
    }).then((response) => {
      console.log(response);
      if(response.data.Lending_status){
        window.location.href = "/P2PLending";
      }else{
        alert(response.data)
      }
    });
  }

  render() {
    const debitFromFunction = () => {
      if(this.state.debitFrom === 'bank'){
        return(
          <div className="row mt-5 d-flex justify-content-center">
            <div className="mcard p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="total-amount">Total amount</h5>
                <div className="amount-container"><span className="amount-text"><span className="dollar-sign">₹</span>{this.state.amount}</span></div>
            </div>
              <div className="pt-4"> <label className="d-flex justify-content-between"> <span className="label-text label-text-cc-number">CARD NUMBER</span><img src="https://img.icons8.com/dusk/64/000000/visa.png" width={30} className="visa-icon" /></label> <input type="tel" name="credit-number" className="form-control credit-card-number" maxLength={19} placeholder="Card number" /> </div>
              <div className="d-flex justify-content-between pt-4">
                <div> <label><span className="label-text">EXPIRY</span> </label> <input type="date" name="expiry-date" className="form-control expiry-class" placeholder="MM / YY" /> </div>
                <div> <label><span className="label-text">CVV</span></label> <input type="tel" name="cvv-number" className="form-control cvv-class" maxLength={4} pattern="\d*" /> </div>
              </div>
              <div className="d-flex justify-content-between pt-5 align-items-center">
                <button type="button" className="btn cancel-btn">Cancel</button>
                <button  onClick={this.handleButtonClicked.bind(this)}  type="button" className="btn payment-btn">Make Payment</button>
              </div>
            </div>
          </div>

        );
      }else{
        return(
        <div className="row mt-5 d-flex justify-content-center">
          <div className="mcard p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="total-amount">Debit From Balance</h5>
              <div className="amount-container"><span className="amount-text"><span className="dollar-sign">₹</span>{this.state.amount}</span></div>
            </div>
            <div className="d-flex justify-content-between pt-5 align-items-center">
              <button type="button" className="btn cancel-btn">Cancel</button>
              <button  onClick={this.handleButtonClicked.bind(this)}  type="button" className="btn payment-btn">Make Payment</button>
            </div>
          </div>
        </div>
        )
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
                <MainHeader name="Search Result"/>
                {debitFromFunction()}
              </div>
              
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
