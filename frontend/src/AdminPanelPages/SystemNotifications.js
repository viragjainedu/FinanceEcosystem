
import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'
// import { Link } from 'react-router-dom';
import Axios from 'axios';


class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { SystemNotification: "",  message : ""  };
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
                          <label htmlFor="exampleTextarea1">Textarea</label>
                          <input className="form-control" id="exampleTextarea1" rows={4}  value={this.state.SystemNotification} onChange={this.handleInputChanged.bind(this)} name="SystemNotification"  type="textarea" />
                        </div>
                        <button type="submit" onClick={this.handleButtonClicked.bind(this)}  className="btn btn-primary me-2">Submit</button>

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
