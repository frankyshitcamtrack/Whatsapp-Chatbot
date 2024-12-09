import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

function PrivateRoute() {
    
    const currentUser =JSON.parse(localStorage.getItem("currentUser"));
 
    const navigate = useNavigate();
  


  return  (currentUser===null || !currentUser)? navigate('/login'): <Layout><Outlet /></Layout>


   
}

export default PrivateRoute;