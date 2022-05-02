
import React from 'react';
import { Link } from 'react-router-dom';

function MainHeader (props){
	return (
        <>
            <div className="row">
            <div className="col-sm-12">
            <div className="home-tab">
                <div className="d-sm-flex align-items-center justify-content-between border-bottom">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                    <p className="nav-link active ps-0" >{props.name}</p>
                    </li>
                </ul>
                <div>
                    <div className="btn-wrapper">
                    <Link to='/P2PLending'><a className="btn btn-otline-dark align-items-center"><i className="icon-people" /> P2P Lending</a></Link>
                    <Link to='/Borrowing'><a className="btn btn-otline-dark align-items-center"><i className="icon-people" /> Borrowing</a></Link>
                    <Link to='/Installments'><a className="btn btn-otline-dark align-items-center"><i className="icon-people" /> Installments</a></Link>
                    <Link to='/Interests'><a className="btn btn-otline-dark align-items-center"><i className="icon-people" /> Returns</a></Link>
                    <Link to='/Withdrawal'><a className="btn btn-otline-dark align-items-center"><i className="icon-people" /> Withdrawal</a></Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}

export default MainHeader;


   
