import { useContext } from "react";
import { Context } from "../context/Context";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

function PrivateRoute() {
    const { isLoged } = useContext(Context);
    const navigate = useNavigate();
    if (!isLoged) {
        navigate('/login')
    }

    return (
        <Layout><Outlet /></Layout>
    );
}

export default PrivateRoute;