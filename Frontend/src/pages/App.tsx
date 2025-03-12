import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import logo from './logo.svg';
import '../assets/styles/App.css';
import { AuthProvider, useAuth } from '../services/AuthContext';
import { TaskProvider } from '../services/TaskContext';
import Login from '../components/Login';
import Register from '../components/Register';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import Navbar from '../components/Layout/Navbar';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <TaskProvider>
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                      <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
                          Task Manager
                        </h1>
                        <AddTaskForm />
                        <TaskList />
                      </div>
                    </div>
                  </TaskProvider>
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
