import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';

import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Campaign from '../pages/Campaign/Campaign';
import Report from '../pages/Reports/Report';
import Setting from '../pages/Setting/Setting';


function Router() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/campaign' element={<Campaign />} />
                <Route path='/report' element={<Report/>} /> 
                <Route path='/setting' element={<Setting/>} />
            </Route> 
        </Routes>
    );
}

export default Router;