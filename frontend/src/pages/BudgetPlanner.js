
import React, { Component } from 'react';
import MyVueComponent from '../expense-analyser/src/App.vue'
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import { Link } from 'react-router-dom';


class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { apiResponse: "" };
	}
	
	callAPI() {
		fetch("http://localhost:9000/budgetPlanner")
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
                <MainHeader name="Budget Planner"/>
                  <br></br>
                  {/* <MyVueComponent /> */}
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
