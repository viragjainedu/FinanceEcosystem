
import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = { apiResponse: "" };
	}
	
	callAPI() {
		fetch("http://localhost:9000/balance")
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
          <TopNavbarAdmin/>
          <div className="container-fluid page-body-wrapper">
            <LeftNavbarAdmin/>
            <div className="main-panel">
              <div className="content-wrapper">
              
              </div>              
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
