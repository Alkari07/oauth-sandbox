import {Link} from 'react-router-dom';
import React from 'react';

export default function Header({authenticated, handleNotAuthenticated}) {
  
  
    const _handleSignInClick = () => {
        //authenticate via passport api on backend
        window.open('http://127.0.0.1:4000/auth/twitter', '_self');
    }
    const _handleLogoutClick = () => {
        window.open('http://127.0.0.1:4000/auth/logout', '_self');
        handleNotAuthenticated();
    }
    const _handleSignInGoogleClick = () => {
        window.open('http://127.0.0.1:4000/auth/google', '_self');
    }
  return <div>
      <ul className='menu'>
          <li>
              <Link to="/">Home</Link>
          </li>
          {authenticated ? (
              <li onClick={_handleLogoutClick}>Logout</li>
          ) : (
              <div>
              <li onClick={_handleSignInClick}>Login Twitter</li>
              <li onClick={_handleSignInGoogleClick}>Login Google</li>
              </div>
          )}    
      </ul>
  </div>;
}
