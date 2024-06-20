import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlanPreview.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PlanListItem({ lift, fetchPlanDetails }) {
    const [liftDetails, setLiftDetails] = useState(lift);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setLiftDetails(lift);
    }, [lift])

    const handleDeleteLift = async (id) => {
        try {
            console.log(`deleting lift with id: ${id}`)
            console.log('lift.id = ', lift.id)
            console.log('current liftDetails', liftDetails);
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
            ...liftDetails,
            [field]: value,
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
        <>
        <tr className="table" key={liftDetails.id}>
            <td>
                {liftDetails.lift_name}
                {/* <br />
                Date: {new Date(liftDetails.completed_at).toLocaleDateString()} */}
            </td>
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
                        className="table"
                    />
                ) : (
                    <>
                        <span>{liftDetails.difficulty}</span>
                    </>
                )}

            </td>
            <td>
                {editing ? (
                    <input
                        type="text"
                        placeholder="Comments"
                        value={liftDetails.comments || ''}
                        onChange={(e) => handleInputChange('comments', e.target.value)}
                        className="table"
                    />
                ) : (
                    <>
                        <span>{liftDetails.comments}</span>
                    </>
                )}

            </td>
            <td className="actions-column">
                {editing ? (
                    <>
                        <button onClick={handleUpdateLift} type="submit" className="table">
                            Update
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setEditing(true)} className="table">
                            Edit
                        </button>
                    </>
                )}

                <button onClick={() => handleDeleteLift(lift.id)}>
                    Delete
                </button>
            </td>

        </tr>
        <tr>
            <td colSpan={7}>Date Completed: {new Date(liftDetails.completed_at).toLocaleDateString()}</td>
        </tr>
        </>
    );
}

export default PlanListItem;





