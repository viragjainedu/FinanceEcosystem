
import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'
// import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment'

class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { SystemNotification: "",  message : "" , notifications:[]};
	}
  
  callAPI() {
    Axios.get("http://localhost:9000/SystemNotifications/notifications", {
    }).then((response) => {
    
      console.log(response.data)
      if(response.data.length === 0){
        this.setState({
          ...this.state,
          message : "You've no notifications yet"
        })
      }

      this.setState({
        ...this.state,
        notifications : response.data
      })

    })
	}
	
	componentWillMount() {
		this.callAPI();
  }

  //All the handle INput functions for forms 
  handleInputChanged(event) {
    this.setState({
        ...this.state,
        [event.target.name] : event.target.value,
    });
    console.log("Hii")
  }

  handleButtonClicked() {
      // var first_name = this.state.first_name;
      console.log(this.state)
      
      if(this.state.SystemNotification !== "" ){
          //Axios ka post request daalna hai 
          Axios.post("http://localhost:9000/SystemNotifications", {
              SystemNotification : this.state.SystemNotification,
          }).then((response) => {
              console.log(response);
              // console.log("Hiiii")
              window.location.href = "/SystemNotifications";
          });
      }
      else{
          this.setState({
              ...this.state,
              message : "Please fill all fields",
          });
      }
      
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
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Send System Notifications to all users</h4>
                      <p className="card-description">
                        <h6 className='text-danger'>{this.state.message}</h6>
                      </p>
                        
                        <div className="form-group">
                          <label htmlFor="exampleTextarea1">Message</label>
                          <input className="form-control" id="exampleTextarea1" rows={4}  value={this.state.SystemNotification} onChange={this.handleInputChanged.bind(this)} name="SystemNotification"  type="textarea" />
                        </div>
                        <button type="submit" onClick={this.handleButtonClicked.bind(this)}  className="btn btn-primary me-2">Submit</button>

                    </div>
                  </div>
                </div>
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Notifications</h4>
                        <p class="card-description text-danger">
                          {this.state.message}
                        </p>
                        <p class="card-description text-success">
                          
                        </p>
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.notifications.map( (item) => 
                                <tr>
                                  <td>{item.message}</td>
                                  <td>{moment(item.not_time).format('DD-MM-YYYY')}</td>
                                  <td>{moment(item.not_time).format('HH:mm:ss')}</td>
                                </tr>                                                                    
                                )}

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
