
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
		this.state = { apiResponse: "" };
        // this.handleClick = this.handleClick.bind(this);
	}
	
	callAPI() {
		fetch("http://localhost:9000/borrowing")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res }));
	}
	
	componentWillMount() {
		this.callAPI();
	}

    // handleClick() {
    //     this.setState();
    // }
    
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
                <MainHeader name="Borrowing"/>
                  {/* <br></br>
                  <h3>{this.state.apiResponse}</h3>
                  <br></br> */}
                  {/* <CompleteProfile/> */}
                                    
                  <div className="col-12 grid-margin">
                      <div className="card">
                          <div className="card-body">
                          <h4 className="card-title">Enter Required Information</h4>
                          <form className="form-sample">
                              <p className="card-description">
                              Personal info
                              </p>
                              <div className="row">
                              <div className="col-md-6">
                                  <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">Emp Length</label>
                                  <div className="col-sm-9">
                                      <input type="text" className="form-control" placeholder=''/>
                                  </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">Home Ownership</label>
                                  <div className="col-sm-9">
                                      <input type="text" className="form-control" />
                                  </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">Annual Income</label>
                                  <div className="col-sm-9">
                                      <input type="text" className="form-control" />
                                  </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">Purpose</label>
                                  <div className="col-sm-9">
                                      <input type="text" className="form-control" />
                                  </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group row">
                                  <label className="col-sm-3 col-form-label">Contact</label>
                                  <div className="col-sm-9">
                                      <input type="text" className="form-control" />
                                  </div>
                                  </div>
                              </div>
                              </div>

                          </form>
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
