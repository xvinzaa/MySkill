import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/login" element={
          localStorage.getItem('token') ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/register" element={
          localStorage.getItem('token') ? <Navigate to="/" /> : <Register />
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <Navbar user={user} onLogout={handleLogout} />
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/detail/:id" element={
          <ProtectedRoute>
            <Navbar user={user} onLogout={handleLogout} />
            <Detail />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
