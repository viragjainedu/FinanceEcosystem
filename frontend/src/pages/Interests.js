
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
		this.state = { returns: [], message : ""};
	}
	
	callAPI() {
    Axios.post("http://localhost:9000/interests/getReturns", {
      email: localStorage.getItem('emailReg'),
    }).then((response) => {
    
      console.log(response.data)
      if(response.data.length === 0){
        this.setState({
          ...this.state,
          message : "You've not lent any loan yet"
        })
      }
      this.setState({
        ...this.state,
        returns : response.data
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
                <MainHeader name="Interests"/>
                  <br></br>
                  <br></br>
                  <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Returns</h4>
                        <p class="card-description text-danger">
                          {this.state.message}
                        </p>
                        <p class="card-description text-success">
                          
                        </p>
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>Borrower Email</th>
                                <th>Return Amount</th>
                                <th>Principle</th>
                                <th>Interest</th>
                                <th>Date of Payment</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.returns.map( (item) => 
                                <tr>
                                  <td>{item.borrower_email}</td>
                                  <td>₹ {item.return_amount}</td>
                                  <td>{item.principal} </td>
                                  <td>₹ {item.interest} </td>
                                  <td>{ item.date_of_payment ? moment(item.date_of_payment).format('DD/MM/YYYY HH:mm:ss') : "NA"} </td>
                                   
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
