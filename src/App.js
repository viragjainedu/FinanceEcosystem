import logo from './logo.svg';
import './App.css';

function App() {
  
  return (
      <div className="container-scroller"> 
        {/* partial:partials/_navbar.html */}
        <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
            <div className="me-3">
              <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
                <span className="icon-menu" />
              </button>
            </div>
            <div>
              <a className="navbar-brand brand-logo" href="index.html">
                <img src="images/" alt="" />
              </a>
              <a className="navbar-brand brand-logo-mini" href="index.html">
                <img src="images/" alt="" />
              </a>
            </div>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-top"> 
            <ul className="navbar-nav">
              <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
                <h1 className="welcome-text">Good Morning, <span className="text-black fw-bold">Virag Jain</span></h1>
                <h3 className="welcome-sub-text">Your Bank Statements this week </h3>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown d-none d-lg-block">
                <a className="nav-link dropdown-bordered dropdown-toggle dropdown-toggle-split" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false"> Select Category </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" aria-labelledby="messageDropdown">
                  <a className="dropdown-item py-3">
                    <p className="mb-0 font-weight-medium float-left">Select category</p>
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item preview-item">
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark">Bootstrap Bundle </p>
                      <p className="fw-light small-text mb-0">This is a Bundle featuring 16 unique dashboards</p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark">Angular Bundle</p>
                      <p className="fw-light small-text mb-0">Everything you’ll ever need for your Angular projects</p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark">VUE Bundle</p>
                      <p className="fw-light small-text mb-0">Bundle of 6 Premium Vue Admin Dashboard</p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark">React Bundle</p>
                      <p className="fw-light small-text mb-0">Bundle of 8 Premium React Admin Dashboard</p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item d-none d-lg-block">
                <div id="datepicker-popup" className="input-group date datepicker navbar-date-picker">
                  <span className="input-group-addon input-group-prepend border-right">
                    <span className="icon-calendar input-group-text calendar-icon" />
                  </span>
                  <input type="text" className="form-control" />
                </div>
              </li>
              <li className="nav-item">
                <form className="search-form" action="#">
                  <i className="icon-search" />
                  <input type="search" className="form-control" placeholder="Search Here" title="Search here" />
                </form>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link count-indicator" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                  <i className="icon-mail icon-lg" />
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" aria-labelledby="notificationDropdown">
                  <a className="dropdown-item py-3 border-bottom">
                    <p className="mb-0 font-weight-medium float-left">You have 4 new notifications </p>
                    <span className="badge badge-pill badge-primary float-right">View all</span>
                  </a>
                  <a className="dropdown-item preview-item py-3">
                    <div className="preview-thumbnail">
                      <i className="mdi mdi-alert m-auto text-primary" />
                    </div>
                    <div className="preview-item-content">
                      <h6 className="preview-subject fw-normal text-dark mb-1">Application Error</h6>
                      <p className="fw-light small-text mb-0"> Just now </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item py-3">
                    <div className="preview-thumbnail">
                      <i className="mdi mdi-settings m-auto text-primary" />
                    </div>
                    <div className="preview-item-content">
                      <h6 className="preview-subject fw-normal text-dark mb-1">Settings</h6>
                      <p className="fw-light small-text mb-0"> Private message </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item py-3">
                    <div className="preview-thumbnail">
                      <i className="mdi mdi-airballoon m-auto text-primary" />
                    </div>
                    <div className="preview-item-content">
                      <h6 className="preview-subject fw-normal text-dark mb-1">New user registration</h6>
                      <p className="fw-light small-text mb-0"> 2 days ago </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown"> 
                <a className="nav-link count-indicator" id="countDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="icon-bell" />
                  <span className="count" />
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" aria-labelledby="countDropdown">
                  <a className="dropdown-item py-3">
                    <p className="mb-0 font-weight-medium float-left">You have 7 unread mails </p>
                    <span className="badge badge-pill badge-primary float-right">View all</span>
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img src="images/faces/Virag.jpg" alt="image" className="img-sm profile-pic" />
                    </div>
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark">Dhundiraj Tumbad</p>
                      <p className="fw-light small-text mb-0"> The meeting is cancelled </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img src="images/faces/Virag.jpg" alt="image" className="img-sm profile-pic" />
                    </div>
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark">Nachiket Rambo</p>
                      <p className="fw-light small-text mb-0"> The meeting is cancelled </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img src="images/faces/Virag.jpg" alt="image" className="img-sm profile-pic" />
                    </div>
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark">Keval Paneer</p>
                      <p className="fw-light small-text mb-0"> The meeting is cancelled </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown d-none d-lg-block user-dropdown">
                <a className="nav-link" id="UserDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className="img-xs rounded-circle" src="images/faces/face8.jpg" alt="Profile image" /> </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                  <div className="dropdown-header text-center">
                    <img className="img-md rounded-circle" src="images/faces/face8.jpg" alt="Profile image" />
                    <p className="mb-1 mt-3 font-weight-semibold">Virag Jain</p>
                    <p className="fw-light text-muted mb-0">virag.j@somaiya.edu</p>
                  </div>
                  <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" /> My Profile <span className="badge badge-pill badge-danger">1</span></a>
                  <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-message-text-outline text-primary me-2" /> Messages</a>
                  <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2" /> Activity</a>
                  <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-help-circle-outline text-primary me-2" /> FAQ</a>
                  <a className="dropdown-item"><i className="dropdown-item-icon mdi mdi-power text-primary me-2" />Sign Out</a>
                </div>
              </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">
              <span className="mdi mdi-menu" />
            </button>
          </div>
        </nav>
        {/* partial */}
        <div className="container-fluid page-body-wrapper">
          {/* partial:partials/_settings-panel.html */}
          <div className="theme-setting-wrapper">
            <div id="settings-trigger"><i className="ti-settings" /></div>
            <div id="theme-settings" className="settings-panel">
              <i className="settings-close ti-close" />
              <p className="settings-heading">SIDEBAR SKINS</p>
              <div className="sidebar-bg-options selected" id="sidebar-light-theme"><div className="img-ss rounded-circle bg-light border me-3" />Light</div>
              <div className="sidebar-bg-options" id="sidebar-dark-theme"><div className="img-ss rounded-circle bg-dark border me-3" />Dark</div>
              <p className="settings-heading mt-2">HEADER SKINS</p>
              <div className="color-tiles mx-0 px-4">
                <div className="tiles success" />
                <div className="tiles warning" />
                <div className="tiles danger" />
                <div className="tiles info" />
                <div className="tiles dark" />
                <div className="tiles default" />
              </div>
            </div>
          </div>
          <div id="right-sidebar" className="settings-panel">
            <i className="settings-close ti-close" />
            <ul className="nav nav-tabs border-top" id="setting-panel" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="todo-tab" data-bs-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="chats-tab" data-bs-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
              </li>
            </ul>
            <div className="tab-content" id="setting-content">
              <div className="tab-pane fade show active scroll-wrapper" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
                <div className="add-items d-flex px-3 mb-0">
                  <form className="form w-100">
                    <div className="form-group d-flex">
                      <input type="text" className="form-control todo-list-input" placeholder="Add To-do" />
                      <button type="submit" className="add btn btn-primary todo-list-add-btn" id="add-task">Add</button>
                    </div>
                  </form>
                </div>
                <div className="list-wrapper px-3">
                  <ul className="d-flex flex-column-reverse todo-list">
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Team review meeting at 3.00 PM
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Prepare for presentation
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Resolve all the low priority tickets due today
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" defaultChecked />
                          Schedule meeting for next week
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" defaultChecked />
                          Project review
                        </label>
                      </div>
                      <i className="remove ti-close" />
                    </li>
                  </ul>
                </div>
                <h4 className="px-3 text-muted mt-5 fw-light mb-0">Events</h4>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary me-2" />
                    <span>Feb 11 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">Creating component page build a js</p>
                  <p className="text-gray mb-0">The total number of sessions</p>
                </div>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="ti-control-record text-primary me-2" />
                    <span>Feb 7 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
                  <p className="text-gray mb-0 ">Call Sarah Graves</p>
                </div>
              </div>
              {/* To do section tab ends */}
              <div className="tab-pane fade" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Friends</p>
                  <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 fw-normal">See All</small>
                </div>
                <ul className="chat-list">
                  <li className="list active">
                    <div className="profile"><img src="images/faces/face1.jpg" alt="image" /><span className="online" /></div>
                    <div className="info">
                      <p>Thomas Douglas</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">19 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face2.jpg" alt="image" /><span className="offline" /></div>
                    <div className="info">
                      <div className="wrapper d-flex">
                        <p>Catherine</p>
                      </div>
                      <p>Away</p>
                    </div>
                    <div className="badge badge-success badge-pill my-auto mx-2">4</div>
                    <small className="text-muted my-auto">23 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face3.jpg" alt="image" /><span className="online" /></div>
                    <div className="info">
                      <p>Daniel Russell</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">14 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face4.jpg" alt="image" /><span className="offline" /></div>
                    <div className="info">
                      <p>James Richardson</p>
                      <p>Away</p>
                    </div>
                    <small className="text-muted my-auto">2 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face5.jpg" alt="image" /><span className="online" /></div>
                    <div className="info">
                      <p>Madeline Kennedy</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">5 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face6.jpg" alt="image" /><span className="online" /></div>
                    <div className="info">
                      <p>Sarah Graves</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">47 min</small>
                  </li>
                </ul>
              </div>
              {/* chat tab ends */}
            </div>
          </div>
          {/* partial */}
          {/* partial:partials/_sidebar.html */}
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="index.html">
                  <i className="mdi mdi-grid-large menu-icon" />
                  <span className="menu-title">Hello, Virag</span>
                </a>
              </li>
              <li className="nav-item nav-category">Bank Features</li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                  <i className="menu-icon mdi mdi-floor-plan" />
                  <span className="menu-title">Your Account</span>
                  <i className="menu-arrow" /> 
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Balance</a></li>
                    <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dropdowns.html">Statements</a></li>
                    <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Intra Bank Transactions</a></li>
                    <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Decentralized Loans</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item nav-category">help</li>
              <li className="nav-item">
                <a className="nav-link" href="http://bootstrapdash.com/demo/star-admin2-free/docs/documentation.html">
                  <i className="menu-icon mdi mdi-file-document" />
                  <span className="menu-title">Chatbot</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* partial */}
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-sm-12">
                  <div className="home-tab">
                    <div className="d-sm-flex align-items-center justify-content-between border-bottom">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active ps-0" id="home-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Account Statement</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#audiences" role="tab" aria-selected="false">Loan Statement</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" id="contact-tab" data-bs-toggle="tab" href="#demographics" role="tab" aria-selected="false">Current </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link border-0" id="more-tab" data-bs-toggle="tab" href="#more" role="tab" aria-selected="false">More</a>
                        </li>
                      </ul>
                      <div>
                        <div className="btn-wrapper">
                          <a href="#" className="btn btn-otline-dark align-items-center"><i className="icon-share" /> Share</a>
                          <a href="#" className="btn btn-otline-dark"><i className="icon-printer" /> Print</a>
                          <a href="#" className="btn btn-primary text-white me-0"><i className="icon-download" /> Export</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* content-wrapper ends */}
            {/* partial:partials/_footer.html */}
            {/* partial */}
          </div>
          {/* main-panel ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
  );
}

export default App;
