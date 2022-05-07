
import React, { Component } from 'react';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import Axios from 'axios';
import moment from 'moment'



class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { insights : [], message: "",months:[], fixed_amount:0 , interests:[]};
	}
	
	callAPI() {
    Axios.post("http://localhost:9000/advanceInsights", {
      email: localStorage.getItem('emailReg'),
    }).then((response) => {

      console.log(response.data)
      if(response.data.length === 0){
        this.setState({
          ...this.state,
          message : "You've not lent any loan yet"
        })
      }
      this.setState({
        ...this.state,
        insights : response.data
      },()=>{
        Axios.post("http://localhost:9000/advanceInsights/fixed_amount_and_months", {
          email: localStorage.getItem('emailReg'),
        }).then((res) => {
          if(res.data.length > 0 ){
            this.setState({
              ...this.state,
              months: res.data.months,
              fixed_amount: res.data.fixed_lending_amount,
            })
          }
        })
      })
    })

  }
	
	callAPIForInterests() {
    Axios.post("http://localhost:9000/advanceInsights/Interests", {
      email: localStorage.getItem('emailReg'),
    }).then((response) => {

      console.log(response.data)
      if(response.data.length === 0){
        this.setState({
          ...this.state,
          message : "You've not lent any loan yet"
        })
      }
      this.setState({
        ...this.state,
        interests : response.data
      })
    })

  }
	
	componentWillMount() {
		this.callAPI();
		this.callAPIForInterests();

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
                  <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Advance Insights on Returns</h4>
                        <p class="card-description text-danger">
                          {this.state.message}
                        </p>
                        <p class="card-description text-success">
                          
                        </p>
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>Borrower</th>
                                <th>Fixed Amount</th>
                                {console.log(this.state)}
                                {
                                  
                                  this.state.months.map((item,i)=>{
                                    return(
                                    <th key={i}> Installment No {item}</th>
                                    )
                                  })
                                }
                                
                              </tr>
                            </thead>
                            <tbody>
                              {
                                Object.keys(this.state.insights).map((e) => {
                                  return(
                                  <tr>
                                    <td>
                                      Borrower {e}
                                    </td>
                                    <td>
                                    ₹ {this.state.fixed_amount} at {this.state.interests[e]}%
                                    </td>
                                    {
                                      this.state.insights[e].map(item => {
                                        return(
                                        <td>
                                          Return Amount - ₹ {item.return_amount}
                                          <br></br>
                                          Principal - ₹ {item.principal}
                                          <br></br>
                                          Interests - ₹ {item.interest}
                                          <br></br>
                                          <p style={{color:"green"}}> Date of Payment - {moment(item.date_of_payment).format('DD/MM/YYYY')}</p>
                                        </td>
                                        )
                                      })
                                    }
                                  </tr>
                                  )
                                })
                              }

                            </tbody>
                          </table>
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
