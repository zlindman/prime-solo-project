import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlanPreview() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [planHistory, setPlanHistory] = useState([]);
  const [lifts, setLifts] = useState([]);
  const {id} = useParams();
  const [addLift, setAddLift] = useState({ name: '', sets: '', reps: '', weight: '' });

  useEffect(() => {
    fetchPlanDetails();
    axios.get(`/api/planData/lifts/${id}`).then(response => {
      setLifts(response.data);
    })
  }, [id]);

  const fetchPlanDetails = () => {
    axios.get(`/api/planData/${id}`).then(response => {
      setPlanHistory(response.data);
    })
  }

  const handleDeleteLift = async (id) => {
    try {
        await axios.delete(`/api/planData/${id}`);
        console.log('Lift deleted successfully');
        fetchPlanDetails();
        
    } catch (error) {
        console.error('Error deleting lift:', error);
        alert('Something went wrong while deleting the lift!');
    }
};

const handleAddLift = async (event) => {
  event.preventDefault();
  const liftData = {
      lift_id: addLift.name,
      sets: addLift.sets,
      reps: addLift.reps,
      weight: addLift.weight,
  };
  try {
      await axios.post('/api/planData/', liftData);
      console.log('Lift added successfully:', liftData);
      // fetch updated plan data after adding a lift
      // clears input fields after adding a lift
      setAddLift({ name: '', sets: '', reps: '', weight: '' });
      fetchPlanDetails();
  } catch (error) {
      console.error('Error adding lift:', error);
      alert('Something went wrong while adding the lift!');
  }
};

  return (
    <div>
      {/* TODO: form or button to add acitivty to the plan */}
      <h2>Add Lift</h2>
      <form onSubmit={(event) => handleAddLift(event)}>
        {/* TODO: map over list of lifts for a plan */}
        <select name="lifts" id="cars"
        value={addLift.name} // ...force the select's value to match the state variable...
        onChange={(e) => setAddLift({ ...addLift, name: e.target.value })}>
          {
            lifts.map(lift => (
              <option value={lift.id}>{lift.name}</option>
            ))
          }
        </select>
                <input type="number" placeholder="Sets" value={addLift.sets} onChange={(e) => setAddLift({ ...addLift, sets: e.target.value })} />
                <input type="number" placeholder="Reps" value={addLift.reps} onChange={(e) => setAddLift({ ...addLift, reps: e.target.value })} />
                <input type="number" placeholder="Weight" value={addLift.weight} onChange={(e) => setAddLift({ ...addLift, weight: e.target.value })} />
                <button type="submit">Add Lift</button>
            </form>

      <h2>Plan Details</h2>
      {/* {
        JSON.stringify(planHistory)
      } */}
        <table>
                <thead>
                    <tr>
                        <th>Lift Name</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {planHistory.map((lift) => (
                        <tr key={lift.id}>
                            <td>{lift.lift_name}</td>
                            <td>{lift.sets}</td>
                            <td>{lift.reps}</td>
                            <td>{lift.weight}</td>
                            <td>
                                <button onClick={() => handleDeleteLift(lift.id)}>Delete</button>
                            </td>
                        </tr>
                    )


                    )}
                </tbody>
            </table>
    </div>
  );
}

export default PlanPreview;