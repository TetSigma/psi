import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (<nav className="p-4 bg-gray-100 flex justify-between">
      <div>
        <Link to="/" className="mr-4 font-bold">MyApp</Link>
        {isAuthenticated && (<>
            <Link to="/groups" className="mr-4">Groups</Link>
            <Link to="/posts" className="mr-4">Posts</Link>
          </>)}
      </div>
      <div>
        {!isAuthenticated ? (<>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>) : (<button onClick={handleLogout} className="text-red-500">Logout</button>)}
      </div>
    </nav>);
};
