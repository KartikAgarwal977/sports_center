import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.location.reload();
    navigate("/");
  }, []);
  return <div>Logging out...</div>;

};

export default Logout;
