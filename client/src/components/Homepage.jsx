import Header from './Header';
import React, {useState, useEffect} from 'react';

export default function Homepage() {
  const [state, setState] = useState({
      user: {},
      error: null,
      authenticated: false
  });

  useEffect (() => {
    fetch('http://localhost:4000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        }
    })
        .then(responseJson=> {
            setState({
                authenticated: true,
                user: responseJson.user
            });
        })
        .catch(error => {
            setState({
                authenticated: false,
                error: "Failed to authenticate user"
            });
        });
  }, []);

  const _handleNotAuthenticated = () => {
    setState({authenticated: false});
  };

  return <div>
      <Header authenticated={state.authenticated} handleNotAuthenticated={_handleNotAuthenticated}/>
      <div>
          {!state.authenticated ? (
              <h1>Welcome</h1>
          ) : (
            <div>
                <h1>You have logged in successfully!</h1>
                <h2>Welcome {state.user.name}</h2>
            </div>
          )}
      </div>
  </div>;
}
