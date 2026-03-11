import { Outlet, Link } from "react-router-dom";
import "../Css/Sidebar.css";

function Sidebar() {
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <ul>
          <li><Link to="/signup">Sign Up</Link></li> 
          <li><Link to="/login">Login</Link></li>           
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/topics">Topics</Link></li> 
          <li><Link to="/logout">Logout</Link></li>
                        
        </ul>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;