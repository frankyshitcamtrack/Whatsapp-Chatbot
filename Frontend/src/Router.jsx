import {Routes,Route} from 'react-router-dom'
import Test from './pages/test';
import Dashboard from './pages/dashboard/Dashboard';

function Router() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/campaign' element={<Test/>}/>
        </Routes>
    );
}

export default Router;