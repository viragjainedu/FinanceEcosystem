
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import { Link } from 'react-router-dom';
import CompleteProfile from '../components/CompleteProfile';

class App extends Component {

	constructor(props) {
		super(props);
		// this.state = { apiResponse: "" };
    // this.handleClick = this.handleClick.bind(this);
    this.state = {  lend_amount: "",request_submitted: false };

	}
	
	// callAPI() {
	// 	fetch("http://localhost:9000/p2pLending")
	// 		.then(res => res.text())
	// 		.then(res => this.setState({ apiResponse: res }));
	// }
	
	// componentWillMount() {
	// 	this.callAPI();
	// }

  // handleClick() {
  //   this.setState();
  // }
  
  handleInputChanged(event) {
    this.setState({
      lend_amount: event.target.value,
      request_submitted: false
    });
  }

  handleButtonClicked() {
    var lend_amount = this.state.lend_amount;
    // this.state.request_submitted = true;
    this.setState({
      request_submitted: true,
      lend_amount: this.state.lend_amount,
    });
    console.log(this.state)
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
                        <input className="typeahead" value={this.state.lend_amount} onChange={this.handleInputChanged.bind(this)} type="number" min="10000" max="1000000" step={10000} placeholder="Units of Rs 10000" />
                      </div>
                    </div>
                    
                  </div>
                  <button onClick={this.handleButtonClicked.bind(this)} className="btn btn-primary me-2">Submit</button>
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
                   <CompleteProfile/>  
                  {renderRequestSubmittedButton()}
              </div>
              
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
