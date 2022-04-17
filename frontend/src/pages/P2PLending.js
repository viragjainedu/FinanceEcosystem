
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
    this.state = {  lend_amount: " ",request_submitted: false, ProfileCompleted: false, lending_transactions : []};
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
      lend_amount: event.target.value,
      request_submitted: false
    });
  }

  handleButtonClicked() {
    var lend_amount = this.state.lend_amount;
    this.setState({
      ...this.state,
      request_submitted: true,
      lend_amount: this.state.lend_amount,
    });
    // console.log(this.state)
    window.location.href  = `/Payment?amount=${lend_amount}`; 


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
          <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Lending</h4>
                  <p className="card-description">
                      Complete the request
                  </p>
                  <div className="form-group row">
                    <div className="col">
                      <label>How much you offer to lend</label>
                      <div id="the-basics">
                        <input className="typeahead" value={this.state.lend_amount} onChange={this.handleInputChanged.bind(this)} type="number" min="10000" max="1000000" step={10000} placeholder="1000" />
                      </div>
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
