import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import AddEmployee from './pages/AddEmployee';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <Router>
      <div className="App font-sans text-gray-900 antialiased">
        <Routes>
          <Route path="/" element={<Navigate to="/dms/login" replace />} />
          <Route path="/dms" element={<Navigate to="/dms/login" replace />} />
          <Route path="/dms/login" element={<Login />} />
          <Route
            path="/dms/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dms/add-user"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dms/add-employee"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dms/password-reset"
            element={
              <ProtectedRoute>
                <PasswordReset />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
