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
    <Router basename='/dms'>
      <div className="App font-sans text-gray-900 antialiased">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-user"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password-reset"
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
