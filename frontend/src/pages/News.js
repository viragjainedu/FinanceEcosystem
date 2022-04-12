
import React, { Component } from 'react';
import './css/style_news.css';
import TopNavbar from '../components/TopNavbar'
import LeftNavbar from '../components/LeftNavbar'
import RightNavbar from '../components/RightNavbar'
import MainHeader from '../components/MainHeader'


class App extends Component {
   
  constructor(props) {
		super(props);
		this.state = { news_link: "", news_title: "", news_image_url: "", news_desc: "", 
                   news_link_1: "", news_title_1: "", news_image_url_1: "", news_desc_1: "",
		               news_link_2: "", news_title_2: "", news_image_url_2: "", news_desc_2: "",  
		               news_link_3: "", news_title_3: "", news_image_url_3: "", news_desc_3: "", 
		               news_link_4: "", news_title_4: "", news_image_url_4: "", news_desc_4: "", 
		               news_link_5: "", news_title_5: "", news_image_url_5: "", news_desc_5: "", };
	}
	
	callAPI() {
		fetch("http://localhost:9000/news")
			.then(res => res.json())
			.then(res => {console.log(res);
        this.setState({ news_title: res[0].heading, news_link: res[0].news_link, news_image_url: res[0].image_link, news_desc: res[0].description, 
                        news_title_1: res[1].heading, news_link_1: res[1].news_link, news_image_url_1: res[1].image_link, news_desc_1: res[1].description,
                        news_title_2: res[2].heading, news_link_2: res[2].news_link, news_image_url_2: res[2].image_link, news_desc_2: res[2].description,
                        news_title_3: res[3].heading, news_link_3: res[3].news_link, news_image_url_3: res[3].image_link, news_desc_3: res[3].description,
                        news_title_4: res[4].heading, news_link_4: res[4].news_link, news_image_url_4: res[4].image_link, news_desc_4: res[4].description,
                        news_title_5: res[5].heading, news_link_5: res[5].news_link, news_image_url_5: res[5].image_link, news_desc_5: res[5].description,
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
                <MainHeader name="News"/>
                  <br></br>
                  {/* <h3>{this.state.apiResponse}</h3> */}
                  <div className="container">
                    <main className="grid">

                      <article>
                      <a href={this.state.news_link} className='newsLink' target="_blank">
                        <img src={this.state.news_image_url} alt="" />
                        <div className="text">
                          <h5>{this.state.news_title}</h5>
                          <p>
                          {this.state.news_desc}
                          </p>
                        </div>
                        </a>
                      </article>
                      
                      <article>
                      <a href={this.state.news_link_1} className='newsLink' target="_blank">
                        <img src={this.state.news_image_url_1} alt="" />
                        <div className="text">
                          <h5>{this.state.news_title_1}</h5>
                          <p>
                          {this.state.news_desc_1}
                          </p>
                        </div>
                        </a>
                      </article>

                      <article>
                      <a href={this.state.news_link_2} className='newsLink' target="_blank">
                        <img src={this.state.news_image_url_2} alt="" />
                        <div className="text">
                          <h5>{this.state.news_title_2}</h5>
                          <p>
                          {this.state.news_desc_2}
                          </p>
                        </div>
                        </a>
                      </article>

                      <article>
                      <a href={this.state.news_link_3} className='newsLink' target="_blank">
                        <img src={this.state.news_image_url_3} alt="" />
                        <div className="text">
                          <h5>{this.state.news_title_3}</h5>
                          <p>
                          {this.state.news_desc_3}
                          </p>
                        </div>
                        </a>
                      </article>

                      <article>
                      <a href={this.state.news_link_4} className='newsLink' target="_blank">
                        <img src={this.state.news_image_url_4} alt="" />
                        <div className="text">
                          <h5>{this.state.news_title_4}</h5>
                          <p>
                          {this.state.news_desc_4}
                          </p>
                        </div>
                        </a>
                      </article>

                      <article>
                        <a href={this.state.news_link_5} className='newsLink' target="_blank">
                        <img src={this.state.news_image_url_5} alt="" />
                        <div className="text">
                          <h5>{this.state.news_title_5}</h5>
                          <p>
                          {this.state.news_desc_5}
                          </p>
                        </div>
                        </a>
                      </article>

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
