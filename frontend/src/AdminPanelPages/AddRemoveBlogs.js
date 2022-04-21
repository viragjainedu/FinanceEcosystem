import React, { Component } from 'react';
import TopNavbarAdmin from '../AdminPanelComponents/TopNavbarAdmin'
import LeftNavbarAdmin from '../AdminPanelComponents/LeftNavbarAdmin'
// import { Link } from 'react-router-dom';
import Axios from 'axios';


class AddRemoveBlogs extends Component {
  
  constructor(props) {
		super(props);
		this.state = {blog_link: "", blog_title: "", blog_image_url: "", blog_desc: ""};
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
      
      if(this.state.blog_title !== "" && this.state.blog_image_url !== "" && this.state.blog_desc !== "" && this.state.blog_link !== ""      
        ){
            //Axios ka post request daalna hai 
            Axios.post("http://localhost:9000/AddRemoveBlogs", {
                blog_title : this.state.blog_title,
                blog_image_url : this.state.blog_image_url,
                blog_desc : this.state.blog_desc,
                blog_link : this.state.blog_link,
                // email : localStorage.getItem('emailReg'),
            }).then((response) => {
                console.log(response);
                // console.log("Hiiii")
            if(response.data.success){
                console.log("Blog Added");
                // window.location.href = "/p2pLending";
            }
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
                      <h4 className="card-title">Add Blogs</h4>
                      <p className="card-description">
                        <h6 className='text-danger'>Check</h6>
                      </p>
                        
                        <div className="form-group">
                          <label htmlFor="exampleTextarea1">Heading</label>
                          <input className="form-control" id="exampleTextarea1" rows={4}   
                          value={this.state.blog_title} 
                          onChange={this.handleInputChanged.bind(this)} name="blog_title"  type="textarea" /> 
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleTextarea2">Image</label>
                          <input className="form-control" id="exampleTextarea2" rows={4}   
                          value={this.state.blog_image_url} 
                          onChange={this.handleInputChanged.bind(this)} name="blog_image_url"  type="textarea" /> 
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleTextarea3">Description</label>
                          <input className="form-control" id="exampleTextarea3" rows={4}   
                          value={this.state.blog_desc} 
                          onChange={this.handleInputChanged.bind(this)} name="blog_desc"  type="textarea" /> 
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleTextarea4">Blog URL</label>
                          <input  className="form-control" id="exampleTextarea4" rows={4}   
                          value={this.state.blog_link} 
                          onChange={this.handleInputChanged.bind(this)} name="blog_link"  type="textarea" /> 
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

export default AddRemoveBlogs;
