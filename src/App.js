import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import AddEmployee from './pages/AddEmployee';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PasswordReset from './pages/PasswordReset';
import AddNewEmployee from './pages/AddNewEmployee';
import SetInterview from './pages/SetInterview';
import EmployeeTable from './pages/EmployeeTable';
import SendEmail from './pages/SendEmail';

function App() {
  return (
    <Router>
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

          <Route
            path="/set-interview"
            element={
              <ProtectedRoute>
                <SetInterview />
              </ProtectedRoute>
            }
          />
           <Route
            path="/candidate-table"
            element={
              <ProtectedRoute>
                <EmployeeTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send-email"
            element={
              <ProtectedRoute>
                <SendEmail />
              </ProtectedRoute>
            }
          />

           <Route
            path="/add-newcandidate/:tempcode"
            element={
                <AddNewEmployee />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;