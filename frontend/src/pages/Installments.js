
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import Axios from 'axios';
import moment from 'moment'
import LineGraph from '../Graphs/LineGraph'

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

  handleButtonClickedPay(installment_amount,installment_id,amount_borrowed) {

    Axios.post(`http://localhost:9000/installments/pay`, {
      email : localStorage.getItem('emailReg'),
      installment_amount : installment_amount,
      installment_id : installment_id,
      amount_borrowed : amount_borrowed,
  }).then((response) => {
    // console.log(response);
    if(response.data.message){
      alert(response.data.message)
      window.location.href = "/installments";
    }else{
      
    }
  });

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
                        <p class="card-description text-success">
                          
                        </p>
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>Installment No</th>
                                <th>Amount Borrowed</th>
                                <th>Interest Rate</th>
                                {/* <th>Principal</th>
                                <th>Interest</th> */}
                                <th>Installment Amount</th>
                                {/* <th>Date of Loan Transaction</th> */}
                                <th>Due Date</th>
                                {/* <th>Payed On</th> */}
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
                                  {/* <td>{item.interest_rate} </td>
                                  <td>{item.interest_rate} % </td> */}
                                  <td>
                                    ₹ {item.installment_amount + item.late_fees}
                                    {(()=>{
                                      if(item.late_fees === 0){
                                        return(<></>)
                                      }else{
                                        return(
                                          <p style={{color: 'red'}}>Late fees: {item.late_fees}</p>
                                        )
                                      }
                                    })()} 
                                  </td>
                                  {/* <td>{item.date_of_loan_transaction} </td> */}
                                  {/* <td>{momnet(item.time_of_payment)} </td> */}
                                  <td>{ item.date_of_payment ? moment(item.date_of_payment).format('DD/MM/YYYY') : "Due Upcoming"} </td>
                                  {/* <td>{ item.time_of_payment ? moment(item.time_of_payment).format('DD-MM-YYYY HH:mm:ss') : "Due Upcoming"} </td> */}
                                  <td class="text-success">{item.status}</td>
                                  {(()=>{
                                    if(item.status === 'Paid'){
                                      return(
                                      <td>
                                        Paid
                                      </td>
                                      );
                                    }else if(item.status === 'Defaulted'){
                                      return(
                                        <td>
                                          <button disabled onClick={(email) => {if(window.confirm('Are you sure to PAY installment?')){ this.handleButtonClickedPay(item.installment_amount, item.installment_id, item.amount_borrowed)};}} className="btn btn-primary me-2">Pay</button>
                                        </td>
                                      )
                                    }else{
                                      return(
                                      <td>
                                        <button onClick={(email) => {if(window.confirm('Are you sure to PAY installment?')){ this.handleButtonClickedPay(item.installment_amount, item.installment_id, item.amount_borrowed)};}} className="btn btn-primary me-2">Pay</button>
                                      </td>
                                      )
                                    }
                                  })()}
                                    
                                </tr>                                                                    
                                )}

                            </tbody>
                          </table>
                        </div>
                        
                        {
                          (()=>{
                            if(!this.state.message){
                              return(
                                <div className='container'>
                                <div className='row'>
                                  <div className='col-lg-12' >
                                    <LineGraph {...this.state} />
                                    <p>Chart of Installments</p>
                                  </div>
                                </div>
                              </div>     
                              )
                            }
                          })()
                        }

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
