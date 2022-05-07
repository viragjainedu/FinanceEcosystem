
import React, { Component } from 'react';

class App extends Component {
  
  render() {
  return (
    <>
        <div className="container">
          <div className="row-lg-12">
            <div className="col-lg-12">
              <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
    </>
    );
  }
}

export default App;
