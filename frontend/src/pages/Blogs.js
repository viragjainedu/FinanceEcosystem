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
            {/* src={this.state.blog_image_url}
            {this.state.blog_title}
            {this.state.blog_desc}
            <a href={this.state.blog_link_1} className="button" target="_blank">
                            Read full post
                          </a> */}
            <div className="main-panel">
              <div className="content-wrapper">
                <MainHeader name="Blogs"/>
                  <br></br>
                  {/* <h3>{this.state.apiResponse}</h3> */}
                  <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://getbootstrap.com/docs/5.1/examples/blog/" />
        {/* Bootstrap core CSS */}
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: "\n      .bd-placeholder-img {\n        font-size: 1.125rem;\n        text-anchor: middle;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n\n      @media (min-width: 768px) {\n        .bd-placeholder-img-lg {\n          font-size: 3.5rem;\n        }\n      }\n    " }} />
        {/* Custom styles for this template */}
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900&display=swap" rel="stylesheet" />
        {/* Custom styles for this template */}
        <link href="blog.css" rel="stylesheet" />
        
        <main className="container">
          
          <div className="row mb-2">
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-350 position-relative">
              <div className="col-auto d-none d-lg-block">
                <img height="250" width="450" src={this.state.blog_image_url}></img>
                </div>
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">World</strong>
                  <h3 className="mb-0">            {this.state.blog_title}
</h3>
                  <p className="card-text mb-auto">            {this.state.blog_desc}
</p>
                  <a href={this.state.blog_link} className="stretched-link"></a>
                </div>
                
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-350 position-relative">
              <div className="col-auto d-none d-lg-block">
                <img height="250" width="450" src={this.state.blog_image_url_1}></img>
                </div>
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">World</strong>
                  <h3 className="mb-0">            {this.state.blog_title_1}
</h3>
                  <p className="card-text mb-auto">            {this.state.blog_desc_1}
</p>
                  <a href={this.state.blog_link_1} className="stretched-link"></a>
                </div>
                
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-350 position-relative">
              <div className="col-auto d-none d-lg-block">
                <img height="250" width="450" src={this.state.blog_image_url_2}></img>
                </div>
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">World</strong>
                  <h3 className="mb-0">            {this.state.blog_title_2}
</h3>
                  <p className="card-text mb-auto">            {this.state.blog_desc_2}
</p>
                  <a href={this.state.blog_link_2} className="stretched-link"></a>
                </div>
                
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-350 position-relative">
              <div className="col-auto d-none d-lg-block">
                <img height="250" width="450" src={this.state.blog_image_url_3}></img>
                </div>
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary">World</strong>
                  <h3 className="mb-0">            {this.state.blog_title_3}
</h3>
                  <p className="card-text mb-auto">            {this.state.blog_desc_3}
</p>
                  <a href={this.state.blog_link_3} className="stretched-link"></a>
                </div>
                
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-success">Design</strong>
                  <h3 className="mb-0">Post title</h3>
                  <div className="mb-1 text-muted">Nov 11</div>
                  <p className="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <a href="{this.state.blog_link_1}" className="stretched-link">Continue reading</a>
                </div>
                <div className="col-auto d-none d-lg-block">
                  <svg className="bd-placeholder-img" width={200} height={250} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div>
              </div>
            </div> */}
          </div>
          
        </main>
        
      </div>
   
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