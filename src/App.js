
import React, { Component } from 'react';
import TopNavbar from './components/TopNavbar'
import LeftNavbar from './components/LeftNavbar'
import RightNavbar from './components/RightNavbar'
import MainHeader from './components/MainHeader'
import { Link } from 'react-router-dom';


class App extends Component {
  
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
      <div className="row">
        <div className="col-sm-3">
          <div className="statistics-details d-flex align-items-center justify-content-between">
            <div>
              <p className="statistics-title">Balance</p>
              <h4 className="rate-percentage">Rs 100</h4>
              <p className="text-danger d-flex">
                {/* <i className="mdi mdi-menu-down" />
                <span>-0.5%</span> */}
              </p>
            </div>
            <div>
              <p className="statistics-title">Transactions Past Week</p>
              <h4 className="rate-percentage">5</h4>
              <p className="text-success d-flex">
                {/* <i className="mdi mdi-menu-up" />
                <span>+0.1%</span> */}
              </p>
            </div>
            
          </div>
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
                  <th>Credit/Debit</th>
                  <th>Account No</th>
                  <th>Amount</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Credit</td>
                  <td>53275535</td>
                  <td>Rs 55</td>
                  <td>5:00 PM</td>
                 
                </tr>
                
                <tr>
                  <td>Debit</td>
                  <td>53275535</td>
                  <td>Rs 65</td>
                  <td>6:00 PM</td>
                  
                </tr>
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
