
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
		this.state = {
      lenders_id : [],
      data : [] ,
      message: "",
	  }
  }

	callAPI(callback) {
    Axios.post("http://localhost:9000/advanceInsights/getLents", {
      email: localStorage.getItem('emailReg'),
    }).then((response)=>{
      // console.log(response.data)
      if(response.data.message){
        // alert("Hii")
        this.setState({
          ...this.state,
          message : "You've not lent any loan yet"
        })
      }
      this.setState({
        ...this.state,
        lenders_id : response.data.lenders_id
      })
      callback() 
    })

  }
	
	
	callAPI2() {
        
  }
	
	
	componentWillMount() {
    const baseThis = this;
		this.callAPI(function(){

    // console.log("Hiii")
    // console.log(baseThis.state.lenders_id)

    for (let i = 0; i < baseThis.state.lenders_id.length; i++) {
      // console.log(baseThis.state.lenders_id[i])
      Axios.post("http://localhost:9000/advanceInsights", {
        email: localStorage.getItem('emailReg'),
        lenders_id: baseThis.state.lenders_id[i],
      }).then((response) => {
  
        console.log(response.data)
        if(response.data && response.data.insights){
          baseThis.setState({
            ...baseThis.state,
            data : [...baseThis.state.data , response.data.insights ]
          })
        }

      
      })
    }


    });
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
                  <p class="card-description text-danger">
                    {this.state.message}
                  </p>
                  {
                    this.state.data.map((item,i)=>{
                      {console.log(i)}  
                      return(
                        <div class="col-lg-12 grid-margin stretch-card">
                          <div class="card">
                            <div class="card-body">
                              <h4 class="card-title">Advance Insights on Returns</h4>
                              <p class="card-description text-danger">
                                {this.state.data.message}
                              </p>
                              <p class="card-description" style={{color: "green"}}>
                                Lent Amount - {10*this.state.data[i].fixed_lending_amount}
                              </p>
                              <p class="card-description text-success">
                                
                              </p>
                              <div class="table-responsive">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th>Borrower</th>
                                      <th>Fixed Amount</th>
                                      {
                                        
                                        this.state.data[i].months.map((item,i)=>{
                                          return(
                                          <th key={i}> Installment No {item}</th>
                                          )
                                        })
                                      }
                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      Object.keys(this.state.data[i].insights).map((e) => {
                                        return(
                                        <tr>
                                          <td>
                                            Borrower {e}
                                          </td>
                                          <td>
                                          ₹ {this.state.data[i].fixed_lending_amount} at {this.state.data[i].interests[e]}%
                                          </td>
                                          {
                                            this.state.data[i].insights[e].map(item => {
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
                      )
                    })
                  }

              </div>
              
            </div>
          </div>
         
        </div>
    </>
    );
  }
}

export default App;
