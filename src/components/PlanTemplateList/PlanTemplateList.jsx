import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function PlanTemplate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const planData = useSelector((store) => store.plans);

  const [plan, setPlan] = useState({ name: '', lifts: [] });
  const [editName, setEditName] = useState('');
  const [addLift, setAddLift] = useState({ liftName: '', weight: '', sets: '', reps: '' });

  const grabPlanData = () => {
    axios.get('/api/planData')
      .then(response => {
        console.log('data response', response.data);
        setPlan(response.data);
      })
      .catch(error => {
        console.log('error in GET', error);
        alert('something went wrong in GET');
      });
  };

  useEffect(() => {
    grabPlanData();
  }, []);

  const handleEditName = () => {
    if (editName !== '') {
      axios.put('/api/planData', { id: plan.id, name: editName })
        .then(response => {
          console.log('Plan name updated successfully');
          setPlan({ ...plan, name: editName });
          setEditName('');
        })
        .catch(error => {
          console.error('Error updating plan name:', error);
          alert('Something went wrong while updating the plan name!');
        });
    }
  };

  const handleAddLift = (event) => {
    event.preventDefault();
    console.log('add lift', addLift)
    const data = { liftName: '', weight: '', sets: '', reps: '' }
    axios.post('/api/planData', data)
      .then(response => {
        console.log('Lift added successfully', data);
        grabPlanData();
        setAddLift(data);
      })
      .catch(error => {
        console.error('Error adding lift:', error);
        alert('Something went wrong while adding the lift!');
      });
  };

  const handleDeleteLift = (id) => {
    axios.delete(`/api/planData/lifts/${id}`)
      .then((response) => {
        grabPlanData();
      })
      .catch((error) => {
        console.log('error in delete', error);
        alert('Something went wrong!');
      });
  };

  const handleCompleteEdit = () => {
    dispatch({ type: 'UPDATE_PLAN_DATA', payload: plan });
    history.push('/PlanPreview');
  };

  return (
    <div>
      <div>
        {editName !== '' ? (
          <div>
            <input type="text" value={editName} onChange={(event) => setEditName(event.target.value)} />
            <button onClick={() => handleEditName()}>Save Name</button>
          </div>
        ) : (
          <div>
            <h2>{plan && plan.name}</h2>
            <button onClick={() => setEditName(plan.name)}>Edit Name</button>
          </div>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Lift Name</th>
            <th>Weight</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plan.lifts && plan.lifts.map((lift, id) => (
            <tr key={id}>
              <td>{lift.name}</td>
              <td>{lift.weight}</td>
              <td>{lift.sets}</td>
              <td>{lift.reps}</td>
              <td>
                <button onClick={() => handleDeleteLift(lift.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={(event) => handleAddLift(event)}>Add Lift</button>
      <button onClick={() => handleCompleteEdit()}>Complete Edit</button>
    </div>
  );
}

export default PlanTemplate;