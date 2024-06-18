import React, { useState } from 'react';
// import {useSelector} from 'react-redux';

function PlanItem( {lift} ) {
//   const store = useSelector((store) => store);
  const [liftDetails, setLiftDetails] = useState({});

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

  const handleInputChange = (activityId, field, value) => {
    setLiftDetails(prevState => ({
      ...prevState, // prevState references the previous state of the liftDetails object
      [activityId]: { // [activityId] is a computed property name that updates the property in 'liftDetails' 
        // corresponding to a specific 'liftId'
        ...prevState[activityId],
        [field]: value, // [field] is a computed property name for the field being updated and 'value'
        // is the new value being set for that field
      },
    }));
  };

  const handleUpdateLift = async (activityId, event) => {
    event.preventDefault();
    const updatedData = liftDetails[activityId];
    try {
      await axios.put(`/api/planData/activity/${activityId}`, updatedData);
      console.log('Lift updated successfully');
      fetchPlanDetails();
      setLiftDetails((prevState) => ({
        ...prevState,
        [activityId]: { difficulty: '', comments: '' },
      }));
    } catch (error) {
      console.error('Error updating lift:', error);
      alert('Something went wrong while updating the lift!');
    }
  };

  // TODO: make toggleItem function axios.get '/api/planData/lifts'

//   const toggleItem = async (activityId) => {
//     try {
//         await axios.get('/api/planData/lifts');
//         console.log('toggle', activityId);
//         .then((response) => {
//             console.log('activity', activity)
//         })
//     }
    

//   }

  return (
            <tr key={lift.id}>
              <td>{lift.lift_name}</td>
              <td>{lift.sets}</td>
              <td>{lift.reps}</td>
              <td>{lift.weight}</td>
              <td>
              <form onSubmit={(event) => handleUpdateLift(lift.id, event)}>
                  <input
                    type="text"
                    placeholder="Difficulty"
                    value={lift.difficulty || ''}
                    onChange={(e) => handleInputChange(lift.id, 'difficulty', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Comments"
                    value={lift.comments || ''}
                    onChange={(e) => handleInputChange(lift.id, 'comments', e.target.value)}
                  />
                  <button type="submit">Update</button>
                </form>
              </td>
              <td>
                <button onClick={() => handleDeleteLift(lift.id)}>Delete</button>
              </td>

            </tr>
  );
}

export default PlanItem;