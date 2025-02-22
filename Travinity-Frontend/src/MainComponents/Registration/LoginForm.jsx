// LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css'

function LoginForm() {
  const [active, setActive] = useState(false);

  const handleSignUpClick = () => {
    setActive(true);
  };

  const handleSignInClick = () => {
    setActive(false);
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className='mt-[100px] LoginForm'>
          <div className={`container ${active ? 'active' : ''}`} id="container">
            <div className="form-container sign-in ">
              <form method="POST" action="/login">
                <h1 style={{marginBottom: '20px'}}>Sign in</h1>
                <button
                  type="button"
                  className="login-with-google-btn"
                  onClick={handleGoogleSignIn}
                  style={{
                    transition: 'background-color .3s, box-shadow .3s',
                    padding: '12px 16px 12px 42px',
                    border: 'none',
                    borderRadius: '3px',
                    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
                    color: '#757575',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                    backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)',
                    backgroundColor: 'white',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '12px 11px',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25)')}
                  onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)')}
                  onMouseDown={(e) => (e.currentTarget.style.backgroundColor = '#eeeeee')}
                  onMouseUp={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25), 0 0 0 3px #c8dafc')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)')}
                >
                  Sign in with Google
                </button>
                <div className="social-icons"></div>
                <div className="containertext">
                  <span className="text-wrapper text-gray-500">Or Use your account</span>
                </div>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit" className=" bg-blue-600 hover:bg-blue-700">Sign In</button>
              </form>
            </div>
            <div className="form-container sign-up">
              <form method="POST" action="/register">
                <h1 style={{marginBottom: '10px'}}>Create Account</h1>
                <button
                  type="button"
                  className="login-with-google-btn"
                  onClick={handleGoogleSignIn}
                  style={{
                    transition: 'background-color .3s, box-shadow .3s',
                    padding: '12px 16px 12px 42px',
                    border: 'none',
                    borderRadius: '3px',
                    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
                    color: '#757575',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                    backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)',
                    backgroundColor: 'white',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '12px 11px',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25)')}
                  onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)')}
                  onMouseDown={(e) => (e.currentTarget.style.backgroundColor = '#eeeeee')}
                  onMouseUp={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25), 0 0 0 3px #c8dafc')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)')}
                >
                  Sign in with Google
                </button>
                <div className="containertext mb-4 mt-[40px]">
                  <span className="text-wrapper text-gray-500">Use your email for registration</span>
                </div>
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="password_confirmation" placeholder="Confirm Password" required />
                <button type="submit" className=" bg-blue-600 hover:bg-blue-700">Sign Up</button>
              </form>
            </div>
            <div className="toggle-container">
              <div className="toggle">
                <div className="toggle-panel toggle-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button id="signIn" onClick={handleSignInClick} className=" bg-blue-600 hover:bg-blue-700">Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button id="signUp" onClick={handleSignUpClick} className=" bg-blue-600 hover:bg-blue-700">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default LoginForm;
