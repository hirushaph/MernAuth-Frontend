import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuthContext } from './hooks/useAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './pages/ResetPassword';

// Import FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

// Setup fontawesome globel icons
library.add(faCircleNotch);

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route
            path='/register'
            element={!user ? <Register /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
