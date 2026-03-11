import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/logout/`,
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        navigate("/login");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;