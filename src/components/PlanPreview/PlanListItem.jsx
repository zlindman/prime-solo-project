import React, { useState } from 'react';
import axios from 'axios';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlanListItem({lift, fetchPlanDetails}) {
  const [liftDetails, setLiftDetails] = useState(lift);
  const [editing, setEditing] = useState(false);

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

  const handleInputChange = (field, value) => {
    setLiftDetails({
      ...liftDetails, // prevState references the previous state of the liftDetails object
      [field]: value, // [field] is a computed property name for the field being updated and 'value'
    });
  };

  const handleUpdateLift = async (event) => {
    event.preventDefault();
    setEditing(false);
    try {
      await axios.put(`/api/planData/activity/${lift.id}`, liftDetails);
      console.log('Lift updated successfully');
      fetchPlanDetails();
    } catch (error) {
      console.error('Error updating lift:', error);
      alert('Something went wrong while updating the lift!');
    }
  };

  return (
    <tr key={liftDetails.id}>
        <td>{liftDetails.lift_name}</td>
        <td>{liftDetails.sets}</td>
        <td>{liftDetails.reps}</td>
        <td>{liftDetails.weight}</td>
        <td>
            {editing ? (
                <input
                type="text"
                placeholder="Difficulty"
                value={liftDetails.difficulty || ''}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                />
            ) : (
                <>
                    <span>{liftDetails.difficulty}</span>
                </>
            )}
       
        </td>
        <td>
            {editing ? (
                <>
                    <input
                    type="text"
                    placeholder="Comments"
                    value={liftDetails.comments || ''}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                    />
                    <button onClick={handleUpdateLift} type="submit">Update</button>
                </>
            ) : (
                <>
                    <span>{liftDetails.comments}</span>
                    <button onClick={() => setEditing(true)}>Edit</button>
                </>
            )}
        </td>
        <td>
        <button onClick={() => handleDeleteLift(lift.id)}>Delete</button>
        </td>

    </tr>
  );
}

export default PlanListItem;





