import React, { Component } from 'react';
import './css/style_blogs.css';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'


class App extends Component {
  
  constructor(props) {
		super(props);
		this.state = { blog_link: "", blog_title: "", blog_image_url: "", blog_desc: "" };
	}
	
	callAPI() {
		fetch("http://localhost:9000/blogs")
			.then(res => res.text())
			.then(res => {
        this.setState({ blog_title: res.result.blog_title,  })
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
                            src="https://assets.entrepreneur.com/content/3x2/2000/20170731105857-businessteam-meeting-teamwork.jpeg"
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
                          <div className="blog-category">Productivity</div>
                          <div className="blog-excerpt">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                              beatae aut nobis illum debitis autem iusto magni doloremque quo
                              tenetur deserunt ea esse voluptate eveniet unde est perferendis
                              iste molestiae delectus vitae, corrupti cum consectetur...
                            </p>
                          </div>
                          <a href="" className="button">
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
                            src="https://media.istockphoto.com/photos/american-dollar-symbol-standing-on-wood-surface-in-front-of-a-graph-picture-id918508630?k=20&m=918508630&s=612x612&w=0&h=6OXnulMkySUyypcMfVdLdE43uRqhP9otMsQmqekBM94="
                            alt=""
                            className="card__image"
                          />
                          <div className="blog-details">
                            <h2 className="blog-title">
                              How to save money while investing
                            </h2>
                          </div>
                          {/* .blog-details ends */}
                        </div>
                        {/* .card_header ends */}
                        <div className="card__body">
                          <div className="blog-category">Learning</div>
                          <div className="blog-excerpt">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                              beatae aut nobis illum debitis autem iusto magni doloremque quo
                              tenetur deserunt ea esse voluptate eveniet unde est perferendis
                              iste molestiae delectus vitae, corrupti cum consectetur...
                            </p>
                          </div>
                          <a href="" className="button">
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
                            src="https://assets.entrepreneur.com/content/3x2/2000/20170731105857-businessteam-meeting-teamwork.jpeg"
                            alt=""
                            className="card__image"
                          />
                          <div className="blog-details">
                            <h2 className="blog-title">
                              How to incorporate teamwork at your company
                            </h2>
                          </div>
                          {/* .blog-details ends */}
                        </div>
                        {/* .card_header ends */}
                        <div className="card__body">
                          <div className="blog-category">Productivity</div>
                          <div className="blog-excerpt">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                              beatae aut nobis illum debitis autem iusto magni doloremque quo
                              tenetur deserunt ea esse voluptate eveniet unde est perferendis
                              iste molestiae delectus vitae, corrupti cum consectetur...
                            </p>
                          </div>
                          <a href="" className="button">
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
                            src="https://assets.entrepreneur.com/content/3x2/2000/20170731105857-businessteam-meeting-teamwork.jpeg"
                            alt=""
                            className="card__image"
                          />
                          <div className="blog-details">
                            <h2 className="blog-title">
                              How to incorporate teamwork at your company
                            </h2>
                          </div>
                          {/* .blog-details ends */}
                        </div>
                        {/* .card_header ends */}
                        <div className="card__body">
                          <div className="blog-category">Productivity</div>
                          <div className="blog-excerpt">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                              beatae aut nobis illum debitis autem iusto magni doloremque quo
                              tenetur deserunt ea esse voluptate eveniet unde est perferendis
                              iste molestiae delectus vitae, corrupti cum consectetur...
                            </p>
                          </div>
                          <a href="" className="button">
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
