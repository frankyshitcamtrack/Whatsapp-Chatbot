import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

function PrivateRoute() {
    
    const currentUser = localStorage.getItem("currentUser");
 
    const navigate = useNavigate();
    
    if (currentUser===null || !currentUser) {
        navigate('/login')
    }

    return (
        <Layout><Outlet /></Layout>
    );
}

export default PrivateRoute;