import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css'
import { LoginPage } from './components/LoginPage/LoginPage';


function App() {



  return (
    <>
      <div className="container">
        {/* <h1 className='text'>RoamNRest</h1> */}
        {/* <div className="type">
        <div id='text-heading'>Only for wanderers</div>
        </div>  */}
        <div className="login-form">
          <h1>Login</h1>
          <form >

            <div className="user-input">
            <label htmlFor="user">Username</label>
            <input type="text" className="user" placeholder='Enter username'/>
            </div>

            <div className="pass-input">
            <label htmlFor="user">Password</label>
            <input type="password" className="pass" placeholder='Enter password'/>
            </div>
            <button className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
