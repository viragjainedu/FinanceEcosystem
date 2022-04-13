
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import App from './App';
import Balance from './pages/Balance';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import Register from './pages/Register';
import P2PLending from './pages/P2PLending';
import Borrowing from './pages/Borrowing';
import IntraBankTransactions from './pages/IntraBankTransactions';
import DecentralizedLoans from './pages/DecentralizedLoans';
import InvestmentAdvisor from './pages/InvestmentAdvisor';
import AdvancedInsights from './pages/AdvancedInsights';
import BudgetPlanner from './pages/BudgetPlanner';
import SearchResult from './pages/SearchResult';
import DocumentVerification from './pages/DocumentVerification';
import Activity from './pages/Activity';
import Blogs from './pages/Blogs';
import News from './pages/News';  
import Payment from './pages/Payment';  
import AdminPanel from './pages/AdminPanel';  

import SystemNotifications from './AdminPanelPages/SystemNotifications'
import LoanApproval from './AdminPanelPages/LoanApproval'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Navigate to="/Login" />} />
      <Route path="/Dashboard" element={<App/>} />
      <Route path="Balance" element={<Balance />} />
      <Route path="P2PLending" element={<P2PLending />} />
      <Route path="Borrowing" element={<Borrowing />} />
      <Route path="IntraBankTransactions" element={<IntraBankTransactions />} />
      <Route path="DecentralizedLoans" element={<DecentralizedLoans />} />
      <Route path="InvestmentAdvisor" element={<InvestmentAdvisor />} />
      <Route path="AdvancedInsights" element={<AdvancedInsights />} />
      <Route path="BudgetPlanner" element={<BudgetPlanner />} />
      <Route path="SearchResult" element={<SearchResult />} />
      <Route path="DocumentVerification" element={<DocumentVerification />} />
      <Route path="Activity" element={<Activity />} />
      <Route path="Blogs" element={<Blogs />} />
      <Route path="News" element={<News />} />
      <Route path="Login" element={<Login />} />
      <Route path="Register" element={<Register />} />
      <Route path="Payment" element={<Payment />} />
      <Route path="AdminPanel" element={<AdminPanel />} />
      
      <Route path="SystemNotifications" element={<SystemNotifications />} />
      <Route path="LoanApproval" element={<LoanApproval />} />
      
      <Route path="404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage/>}/>  
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
