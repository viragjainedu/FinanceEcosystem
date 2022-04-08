
import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'
// import { Link } from 'react-router-dom';
// import Axios from 'axios';


class App extends Component {
  
  constructor(props) {
		super(props);
		// this.state = { SystemNotification: "",  message : ""  };
	}
	

  render() {
  return (
    <>

        <div className="container-scroller"> 
          <TopNavbarAdmin/>
          <div className="container-fluid page-body-wrapper">
            <LeftNavbarAdmin/>
            <div className="main-panel">
                          
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
