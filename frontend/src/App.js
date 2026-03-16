import React from 'react';
import { BrowserRouter as Router, Routes, Route , useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Topics from './Pages/Topics';
import Logout from './Pages/Logout';
import QuestionCard from './Components/QuestionCard';
import './App.css';

function Layout() {
  const location = useLocation();

  const hideSidebarRoutes = ["/login", "/signup"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      <Header />

      <div className="dashboard">
        {!hideSidebar && <Sidebar />}

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/quiz/:topic" element={<QuestionCard />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </>
  );
}
function App() {
  return (
    <Router>
      <div className="App">
        <Layout />
      </div>
    </Router>
  );
}
export default App;
