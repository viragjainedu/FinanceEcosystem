
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'


class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { apiResponse: "" };
	}
	
	callAPI() {
		fetch("http://localhost:9000/interests")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res }));
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
              </div>
              
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
