import React, { Component } from 'react';
import './css/style_blogs.css';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'
import { Link } from 'react-router-dom';


class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { blog_link: "", blog_title: "", blog_image_url: "", blog_desc: "", 
                   blog_link_1: "", blog_title_1: "", blog_image_url_1: "", blog_desc_1: "", 
		               blog_link_2: "", blog_title_2: "", blog_image_url_2: "", blog_desc_2: "", 
		               blog_link_3: "", blog_title_3: "", blog_image_url_3: "", blog_desc_3: "", };
	}
	
	callAPI() {
		fetch("http://localhost:9000/blogs")
			.then(res => res.json())
			.then(res => {console.log(res);
        this.setState({ blog_title: res[0].heading, blog_link: res[0].blog_link, blog_image_url: res[0].image_link, blog_desc: res[0].description, 
                        blog_title_1: res[1].heading, blog_link_1: res[1].blog_link, blog_image_url_1: res[1].image_link, blog_desc_1: res[1].description,
                        blog_title_2: res[2].heading, blog_link_2: res[2].blog_link, blog_image_url_2: res[2].image_link, blog_desc_2: res[2].description,
                        blog_title_3: res[3].heading, blog_link_3: res[3].blog_link, blog_image_url_3: res[3].image_link, blog_desc_3: res[3].description,
        })
      });
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
                <MainHeader name="Blogs"/>
                  <br></br>
                  {/* <h3>{this.state.apiResponse}</h3> */}
                  <div className="container">

                    <article>
                      <div className="blog_card">
                        <div className="card__header">
                          <img
                            src={this.state.blog_image_url}
                            alt=""
                            className="card__image"
                          />
                          <div className="blog-details">
                            <h2 className="blog-title">
                              {this.state.blog_title}
                            </h2>
                          </div>
                          {/* .blog-details ends */}
                        </div>
                        {/* .card_header ends */}
                        <div className="card__body">
                          {/* <div className="blog-category">Productivity</div> */}
                          <div className="blog-excerpt">
                            <p>
                            {this.state.blog_desc}
                            </p>
                          </div>
                          <a href={this.state.blog_link} className="button" target="_blank">
                            Read full post
                          </a>
                        </div>
                        {/* .card_body ends */}
                      </div>
                      {/* .card */}
                    </article>
                    
                    <article>
                      <div className="blog_card">
                        <div className="card__header">
                          <img
                            src={this.state.blog_image_url_1}
                            alt=""
                            className="card__image"
                          />
                          <div className="blog-details">
                            <h2 className="blog-title">
                              {this.state.blog_title_1}
                            </h2>
                          </div>
                          {/* .blog-details ends */}
                        </div>
                        {/* .card_header ends */}
                        <div className="card__body">
                          {/* <div className="blog-category">Productivity</div> */}
                          <div className="blog-excerpt">
                            <p>
                            {this.state.blog_desc_1}
                            </p>
                          </div>
                          <a href={this.state.blog_link_1} className="button" target="_blank">
                            Read full post
                          </a>
                        </div>
                        {/* .card_body ends */}
                      </div>
                      {/* .card */}
                    </article>
                    
                    <article>
                      <div className="blog_card">
                        <div className="card__header">
                          <img
                            src={this.state.blog_image_url_2}
                            alt=""
                            className="card__image"
                          />
                          <div className="blog-details">
                            <h2 className="blog-title">
                              {this.state.blog_title_2}
                            </h2>
                          </div>
                          {/* .blog-details ends */}
                        </div>
                        {/* .card_header ends */}
                        <div className="card__body">
                          {/* <div className="blog-category">Productivity</div> */}
                          <div className="blog-excerpt">
                            <p>
                            {this.state.blog_desc_2}
                            </p>
                          </div>
                          <a href={this.state.blog_link_2} className="button" target="_blank">
                            Read full post
                          </a>
                        </div>
                        {/* .card_body ends */}
                      </div>
                      {/* .card */}
                    </article>
                    
                    <article>
                      <div className="blog_card">
                        <div className="card__header">
                          <img
                            src={this.state.blog_image_url_3}
                            alt=""
                            className="card__image"
                          />
                          <div className="blog-details">
                            <h2 className="blog-title">
                              {this.state.blog_title_3}
                            </h2>
                          </div>
                          {/* .blog-details ends */}
                        </div>
                        {/* .card_header ends */}
                        <div className="card__body">
                          {/* <div className="blog-category">Productivity</div> */}
                          <div className="blog-excerpt">
                            <p>
                            {this.state.blog_desc_3}
                            </p>
                          </div>
                          <a href={this.state.blog_link_3} className="button" target="_blank">
                            Read full post
                          </a>
                        </div>
                        {/* .card_body ends */}
                      </div>
                      {/* .card */}
                    </article>
                    
                  </div>
                  {/* .container ends */}

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