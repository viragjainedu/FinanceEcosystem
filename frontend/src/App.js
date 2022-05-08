
import React, { Component } from 'react';
import TopNavbar from './components/TopNavbar'
import LeftNavbar from './components/LeftNavbar'
import RightNavbar from './components/RightNavbar'
import MainHeader from './components/MainHeader'
import Axios from 'axios';


class App extends Component {
  
  constructor(props) {
		super(props);
    this.state = {  
      balance: 0,
      total_money_lent: 0,
      total_money_borrowed: 0,
      total_interest_received: 0 ,
      total_money_withdrawn:0 ,
      total_interest_paid: 0,
      prev_transactions: []
    };
	}

  //To check whether user has completed form or not
  callAPI() {
    Axios.post("http://localhost:9000/account_stats", {
          email: localStorage.getItem('emailReg'),
      }).then((response) => {
        console.log(response);
        if(response.data){
          this.setState({
            ...this.state,
            balance : response.data.balance,
            total_money_lent : response.data.total_money_lent,
            total_money_borrowed : response.data.total_money_borrowed,
            total_interest_received : response.data.total_interest_received,
            total_interest_paid : response.data.total_interest_paid,
            total_money_withdrawn : response.data.total_money_withdrawn,
          },()=>{
              Axios.post("http://localhost:9000/account_stats/prev_transactions", {
                email: localStorage.getItem('emailReg'),
                }).then((res) => {
                  console.log(res);
                  if(res.data){
                    this.setState({
                      ...this.state,
                      prev_transactions : res.data
                    })

                }
              });
          })
      }
    });
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
                <MainHeader name="Statement"/>
                  <>
                  <div className="tab-content tab-content-basic">
    <div
      className="tab-pane fade show active"
      id="overview"
      role="tabpanel"
      aria-labelledby="overview"
    >

      <div className="container">
      <div className="row">
        {/* <div className="col-sm-12"> */}
          {/* <div className="statistics-details d-flex align-items-center justify-content-between"> */}
            <div className='col-lg-2' >
              <p className="statistics-title">Balance</p>
              <h4 className="rate-percentage">₹ {this.state.balance}</h4>
              <p className="text-danger d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">Total money Lent</p>
              <h4 className="rate-percentage">₹ {this.state.total_money_lent}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">Total money Borrowed</p>
              <h4 className="rate-percentage">₹ {this.state.total_money_borrowed}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">Total Interest Received</p>
              <h4 className="rate-percentage">₹ {this.state.total_interest_received}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">Total Interest Paid</p>
              <h4 className="rate-percentage">₹ {this.state.total_interest_paid}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">Total Money Withdrawn</p>
              <h4 className="rate-percentage">₹ {this.state.total_money_withdrawn}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            
          {/* </div> */}
        {/* </div> */}
      </div>
      </div>
    </div>
  </div>
  
  <div className="row">
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Previous Transaction</h4>
          <p className="card-description">
            {/* Add class <code>.table-hover</code> */}
          </p>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Lent/Borrowed</th>
                  <th>Amount</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {
                this.state.prev_transactions.map((item,i) => 
                  <tr>
                    <td>{(()=>{if(item.amount_lent){return 'Lent'}else{return 'Borrowed'}})()}</td>
                    {console.log(item)}
                    <td>₹ {item.amount_lent}{item.amount_borrowed}</td>
                    <td>{item.transaction_time}</td>
                  </tr> 
                )
                }
                
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
                  </>
              </div>
              
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
