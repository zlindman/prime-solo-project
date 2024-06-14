import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
    <div className="container">
      <h2>Hello, {user.username}!</h2>
      {
        plans.map(plan => (
          <>
            <Link to={`plan/${plan.id}`}>{plan.name}</Link>
            <br />
          </>
        ))
      }
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
