import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';
// import BeginLifting from '../BeginLifting/BeginLifting';
// import PlanTemplate from '../PlanTemplate/PlanTemplate';
// import ViewHistory from '../ViewHistory/ViewHistory';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get('/api/planData/plan/list').then(response => {
      setPlans(response.data);
    })
  }, []);

  return (
    <div className="background-container">
      <div className="background"></div>
      <div className="greeting">
      <h1>Hello, {user.username}!</h1>
      </div>
      <div className="content">
      <h3>Select a Muscle Group...</h3>
      {
                    plans.map(plan => (
                        <div className="plan-link" key={plan.id}>
                            <Link to={`plan/${plan.id}`}>{plan.name}</Link>
                        </div>
                    ))
                }
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
