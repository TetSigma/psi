import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Groups } from './pages/Groups';
import { Posts } from './pages/Posts';
import { Home } from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:groupId" element={<Posts />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
