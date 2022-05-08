
import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'
import axios from 'axios';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	
	callAPI() {
    axios.post("http://localhost:9000/account_stats/admin_stats")
    .then(res => {
      if(res.data){
        console.log(res.data)
        this.setState({
          ...this.state,
          data : res.data
        })
      }
    })
	}
	
	componentWillMount() {
		this.callAPI();
	}

  render() {
  return (
    <>

        <div className="container-scroller"> 
          <TopNavbarAdmin/>
          <div className="container-fluid page-body-wrapper">
            <LeftNavbarAdmin/>
            <div className="main-panel">


  <div className="tab-content tab-content-basic">
    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
      <div className="content-wrapper">
      <div className="container">
      <div className="row">
            <div className='col-lg-2' >
              <p className="statistics-title">Active Loans</p>
              <h4 className="rate-percentage">{this.state.data.ActiveLoans}</h4>
              <p className="text-danger d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">CompletedLoans</p>
              <h4 className="rate-percentage">{this.state.data.CompletedLoans}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">Defaulted Loans</p>
              <h4 className="rate-percentage">{this.state.data.DefaultLoans}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">Total Lenders</p>
              <h4 className="rate-percentage">{this.state.data.TotalLenders}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            <div className='col-lg-2'>
              <p className="statistics-title">Total Borrowers</p>
              <h4 className="rate-percentage">{this.state.data.TotalBorrowers}</h4>
              <p className="text-success d-flex">
              </p>
            </div>
            
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
