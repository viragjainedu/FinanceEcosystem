
import React from 'react';
import { Link } from 'react-router-dom';

function LeftNavbar (){
	return (
        <>
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
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
                    <li className="nav-item"> <Link to="/Balance"><a className="nav-link" href="pages/ui-features/buttons.html">Balance</a></Link></li>
                    <li className="nav-item"> <Link to="/DocumentVerification"><a className="nav-link" href="pages/ui-features/buttons.html">DocumentVerification</a></Link></li>
                    <li className="nav-item"> <Link to="/IntraBankTransactions"><a className="nav-link" href="pages/ui-features/buttons.html">Intra Bank Transactions</a></Link></li>
                    <li className="nav-item"> <Link to="/DecentralizedLoans"><a className="nav-link" href="pages/ui-features/buttons.html">Loans</a></Link></li>
                    <li className="nav-item"> <Link to="/InvestmentAdvisor"><a className="nav-link" href="pages/ui-features/buttons.html">Investment Advisor</a></Link></li>
                    <li className="nav-item"> <Link to="/AdvancedInsights"><a className="nav-link" href="pages/ui-features/buttons.html">Advanced Insights</a></Link></li>
                    <li className="nav-item"> <Link to="/BudgetPlanner"><a className="nav-link" href="pages/ui-features/buttons.html">Expense Analyser</a></Link></li>
                    <li className="nav-item"> <Link to="/Blogs"><a className="nav-link" href="pages/ui-features/buttons.html">Blogs</a></Link></li>
                    <li className="nav-item"> <Link to="/News"><a className="nav-link" href="pages/ui-features/buttons.html">News</a></Link></li>
                    
                  </ul>
                </div>
              </li>
              {/* <li className="nav-item nav-category">help</li>
              <li className="nav-item">
                <a className="nav-link" href="http://bootstrapdash.com/demo/star-admin2-free/docs/documentation.html">
                  <i className="menu-icon mdi mdi-file-document" />
                  <span className="menu-title">Chatbot</span>
                </a>
              </li> */}
            </ul>
          </nav>
        </>
    )
}

export default LeftNavbar;


   