
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import App from './App';
import Balance from './pages/Balance';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import P2PLending from './pages/P2PLending';
import Borrowing from './pages/Borrowing';
// import IntraBankTransactions from './pages/IntraBankTransactions';
// import DecentralizedLoans from './pages/DecentralizedLoans';
// import InvestmentAdvisor from './pages/InvestmentAdvisor';
import AdvancedInsights from './pages/AdvancedInsights';
// import BudgetPlanner from './pages/BudgetPlanner';
import SearchResult from './pages/SearchResult';
// import DocumentVerification from './pages/DocumentVerification';
import Activity from './pages/Activity';
import Blogs from './pages/Blogs';
import News from './pages/News';  
import Payment from './pages/Payment';  
import Installments from './pages/Installments';  
import Interests from './pages/Interests';  
import MyProfile from './pages/MyProfile';
import Faqs from './pages/Faqs';

import Withdrawal from './pages/Withdrawal'
import Fico from './pages/Fico';  
import TestReact from './pages/TestReact';  
import Loader from './pages/Loader';  

import AdminPanel from './pages/AdminPanel';  
import SystemNotifications from './AdminPanelPages/SystemNotifications'
import LoanApprovalUnverified from './AdminPanelPages/LoanApprovalUnverified'
import LoanApprovalVerified from './AdminPanelPages/LoanApprovalVerified'
import LoanDefaulted from './AdminPanelPages/LoanDefaulted'
import LoanCompleted from './AdminPanelPages/LoanCompleted'
import AddRemoveBlogs from './AdminPanelPages/AddRemoveBlogs'
import ProtectedRoutes from './pages/ProtectedRoutes';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Navigate to="/Login" />} />
      <Route element={<ProtectedRoutes/>}>
        <Route path="/Dashboard" element={<App/>} />
        <Route path="Balance" element={<Balance />} />
        <Route path="P2PLending" element={<P2PLending />} />
        <Route path="Borrowing" element={<Borrowing />} />
        {/* <Route path="IntraBankTransactions" element={<IntraBankTransactions />} /> */}
        {/* <Route path="DecentralizedLoans" element={<DecentralizedLoans />} /> */}
        {/* <Route path="InvestmentAdvisor" element={<InvestmentAdvisor />} /> */}
        <Route path="AdvancedInsights" element={<AdvancedInsights />} />
        {/* <Route path="BudgetPlanner" element={<BudgetPlanner />} /> */}
        <Route path="SearchResult" element={<SearchResult />} />
        {/* <Route path="DocumentVerification" element={<DocumentVerification />} /> */}
        <Route path="Activity" element={<Activity />} />
        <Route path="Blogs" element={<Blogs />} />
        <Route path="News" element={<News />} />
        <Route path="Payment" element={<Payment />} />
        <Route path="Installments" element={<Installments />} />
        <Route path="Interests" element={<Interests />} />
        <Route path="MyProfile" element={<MyProfile />} />
        <Route path="Faqs" element={<Faqs />} />

        <Route path="Fico" element={<Fico />} />
        <Route path="Withdrawal" element={<Withdrawal />} />
        <Route path="TestReact" element={<TestReact />} />
        
        
        <Route path="AdminPanel" element={<AdminPanel />} />
        <Route path="SystemNotifications" element={<SystemNotifications />} />
        <Route path="LoanApprovalUnverified" element={<LoanApprovalUnverified />} />
        <Route path="LoanApprovalVerified" element={<LoanApprovalVerified />} />
        <Route path="LoanDefaulted" element={<LoanDefaulted />} />
        <Route path="LoanCompleted" element={<LoanCompleted />} />
        <Route path="AddRemoveBlogs" element={<AddRemoveBlogs />} />
        
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage/>}/>  

      </Route>
      <Route path="Login" element={<Login />} />
      <Route path="Register" element={<Register />} />
      <Route path="ForgotPassword" element={<ForgotPassword />} />
      <Route path="Loader" element={<Loader />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
