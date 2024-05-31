import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import BeginLifting from '../BeginLifting/BeginLifting';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Hello, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <nav>
        <ul>
          <li>
            <Link to="/BeginLifting">
              <button>Begin Lifting!</button>
            </Link>
          </li>
          <li>
            <Link to="/PlanTemplate">
              <button>Create New Plan</button>
            </Link>
          </li>
          <li>
            <Link to="/ViewHistory">
              <button>View History</button>
            </Link>
          </li>
        </ul>
      </nav>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
