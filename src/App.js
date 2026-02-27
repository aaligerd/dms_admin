import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import AddEmployee from './pages/AddEmployee';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PasswordReset from './pages/PasswordReset';
import RequisitionList from "./pages/RequisitionList";
import RequisitionUpdate from "./pages/RequisitionUpdate";
import RequisitionForm from "./pages/RequisitionForm";
import AddNewEmployee from './pages/AddNewEmployee';
import SendEmail from './pages/SendEmail';
import EmployeeTable from './pages/EmployeeTable';
import InterviewDetailsTable from './pages/InterviewDetailsTable';

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
              path="/add-employee"
              element={
                <AddEmployee />
              }
            />

            <Route
              path="/add-newcandidate/:tempcode"
              element={
                  <AddNewEmployee />
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
            path="/candidate-table"
            element={
              <ProtectedRoute>
                <EmployeeTable />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview-details"
            element={
              <ProtectedRoute>
                <InterviewDetailsTable />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-requisition"
            element={
              <ProtectedRoute>
                <RequisitionForm />
              </ProtectedRoute>
            }
          />

          <Route path="/requisition" 
          element={
          <ProtectedRoute><RequisitionList /></ProtectedRoute>} 
          />
          <Route
            path="/requisition/update/:id"
            element={<ProtectedRoute><RequisitionUpdate /></ProtectedRoute>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;