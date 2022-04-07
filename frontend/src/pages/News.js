
import React, { Component } from 'react';
import './css/style_news.css';
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
		fetch("http://localhost:9000/news")
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
                <MainHeader name="News"/>
                  <br></br>
                  <h3>{this.state.apiResponse}</h3>
                  <div className="container">
                    <main className="grid">
                      <article>
                        <img src="https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=" alt="" />
                        <div className="text">
                          <h5>This is Heading</h5>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                          </p>
                        </div>
                      </article>
                      <article>
                        <img src="https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=" alt="" />
                        <div className="text">
                          <h5>This is Heading</h5>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                          </p>
                        </div>
                      </article>
                      <article>
                        <img src="https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=" alt="" />
                        <div className="text">
                          <h5>This is Heading</h5>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                          </p>
                        </div>
                      </article>
                      <article>
                        <img src="https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=" alt="" />
                        <div className="text">
                          <h5>This is Heading</h5>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                          </p>
                        </div>
                      </article>
                      <article>
                        <img src="https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=" alt="" />
                        <div className="text">
                          <h5>This is Heading</h5>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                          </p>
                        </div>
                      </article>
                      <article>
                        <img src="https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=" alt="" />
                        <div className="text">
                          <h5>This is Heading</h5>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                            debitis?
                          </p>
                        </div>
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
