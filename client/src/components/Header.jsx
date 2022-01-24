import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

export default function Header({authenticated, handleNotAuthenticated}) {
  
  
    const _handleSignInClick = () => {
        //authenticate via passport api on backend
        //window.open('http://localhost:4000/auth/twitter', '_self');
        console.log("sign in click");
    }
    const _handleLogoutClick = () => {
        //window.open('http://localhost:4000/auth/logout', '_self');
        console.log("sign out click");
        handleNotAuthenticated();
    }
  return <div>
      <ul>
          <li>
              <Link to="/">Home</Link>
          </li>
          {authenticated ? (
              <li onClick={_handleLogoutClick}>Logout</li>
          ) : (
              <li onClick={_handleSignInClick}>Login</li>
          )}    
      </ul>
  </div>;
}
