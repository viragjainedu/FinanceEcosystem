
import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'
// import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment'

class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { default_loans:[] };
	}

  callAPI() {

    Axios.get("http://localhost:9000/LoanDefault/DefaultLoans", {
      }).then((response) => {
        this.setState({
            ...this.state,
            default_loans : response.data
        })
    });    
  }

  componentWillMount() {
    this.callAPI();
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
            <h4 className="card-title">Default Loans</h4>
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
                     No of Months 
                    </th>
                    <th>
                     Amount 
                    </th>
                    <th>
                     Interest 
                    </th>
                    <th>
                     Date of Loan Transaction 
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.default_loans.map((item,i) => 
                        <tr>
                        <td className="py-1">
                          {item.email}
                        </td>
                        <td className="py-1">
                          {item.no_of_months } 
                        </td>
                        <td className="py-1">
                          ₹{item.amount_borrowed } 
                        </td>
                        <td className="py-1">
                          {item.interest_rate}%
                        </td>
                        <td className="py-1">
                        { item.date_of_loan_transaction ? moment(item.date_of_loan_transaction).format('DD/MM/YYYY') : ""} 
                        </td>
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
