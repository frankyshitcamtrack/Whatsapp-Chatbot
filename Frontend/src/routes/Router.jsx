import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';

import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Campaign from '../pages/Campaign/Campaign';
import Report from '../pages/Reports/Report';
import Setting from '../pages/Setting/Setting';
import Utilisateur from '../pages/Setting/Utilisateurs';
import TypeCampagne from '../pages/Setting/TypeCampagne';


function Router() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/campaign' element={<Campaign />} />
                <Route path='/report' element={<Report />} />
                <Route path='settings' element={<Setting />} >
                    <Route path='utilisateurs' element={<Utilisateur />} />
                    <Route path='type-campagne' element={<TypeCampagne />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;