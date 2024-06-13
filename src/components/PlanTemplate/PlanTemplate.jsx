import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function PlanTemplate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const planData = useSelector((store) => store.planData);

    const [planId, setPlanId] = useState(null);
    const [editName, setEditName] = useState('My Plan');
    const [lifts, setLifts] = useState([]);
    const [addLift, setAddLift] = useState({ name: '', sets: '', reps: '', weight: '' });

    // // Fetch plan ID when the component mounts
    // useEffect(() => {
    //     axios.post('/api/planData/create-plan')
    //         .then(response => {
    //             const { planId } = response.data;
    //             setPlanId(planId);
    //             console.log('Created or retrieved plan ID:', planId); // Log the plan ID
    //         })
    //         .catch(error => {
    //             console.error('Error generating or retrieving plan ID:', error);
    //         });
    // }, []); // Empty dependency array ensures this runs only once on mount

    // // fetches data associated with the plan
    // useEffect(() => {
    //     axios.get(`/api/planData`)
    //         .then(response => {
    //             console.log('Fetched plan data:', response.data);
    //             dispatch({ type: 'SET_PLAN_DATA', payload: response.data });
    //         })
    //         .catch(error => {
    //             console.error('Error fetching plan data:', error);
    //             console.log('error retrieving response.data', response.data);
    //         });
    // }, [dispatch]); 

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // create a new plan and retrieve it's id
    //             const response = await axios.post('/api/planData/create-plan');
    //             const { planId } = response.data;
    //             setPlanId(planId);
    //             console.log('Created or retrieved plan ID:', planId);
    //             console.log('response.data', response.data);

    //             const planDataResponse = await axios.get(`/api/planData/${planId}`);
    //             console.log('planDataResponse', planDataResponse);
    //             console.log('Fetched plan data:', planDataResponse.data);
    //             dispatch({ type: 'SET_PLAN_DATA', payload: planDataResponse.data });
    //             setEditName(planDataResponse.data.plan_name) || 'My Plan';
    //         } catch (error) {
    //             console.error('Error generating or retrieving plan ID:', error);
    //         }
    //     };

    //     fetchData();
    // }, [dispatch]);

    useEffect(() => {
        const createPlan = async () => {
            try {
                const response = await axios.post('/api/planData/create-plan');
                const { planId } = response.data;
                setPlanId(planId);
                console.log('Created or retrieved plan ID:', planId);
            } catch (error) {
                console.error('Error generating or retrieving plan ID:', error);
            }
        };

        createPlan();
    }, []);


    // updates the editName state when planData changes
    // useEffect(() => {
    //     if (planData && planData.plan_name) {
    //         setEditName(planData.plan_name);
    //     }
    //     console.log('Plan ID in component:', planId); 
    //     console.log('planData'. planData); 
    //     console.log('planData.plan_name', planData.plan_name);
    // }, [planData]);


    // const handleEditName = () => {
    //     if (editName !== '') {
    //         axios.put('/api/planData', { id: planId, name: editName })
    //             .then(response => {
    //                 console.log('plan id', planId);
    //                 console.log('editName useState', editName);
    //                 console.log('Plan name updated successfully', planData.plan_name);
    //                 dispatch({ type: 'FETCH_PLAN_DATA', payload: planId });
    //                 setEditName('');
    //             })
    //             .catch(error => {
    //                 console.error('Error updating plan name:', error);
    //                 alert('Something went wrong while updating the plan name!');
    //             });
    //     }
    // };

    const handleEditName = async () => {
        if (editName !== '') {
            try {
                await axios.put('/api/planData', { id: planId, name: editName });
                console.log('Plan name updated successfully');
                const updatedPlanData = { ...planData, plan_name: editName };
                dispatch({ type: 'SET_PLAN_DATA', payload: updatedPlanData });
            } catch (error) {
                console.error('Error updating plan name:', error);
                alert('Something went wrong while updating the plan name!');
            }
        }
    };

    const handleAddLift = async (event) => {
        event.preventDefault();
        const liftData = {
            name: addLift.name,
            sets: addLift.sets,
            reps: addLift.reps,
            weight: addLift.weight,
            planId: planId,
        };
        try {
            await axios.post('/api/planData/add-lift', liftData);
            console.log('Lift added successfully:', liftData);
            // fetch updated plan data after adding a lift
            const planDataResponse = await axios.get(`/api/planData/${planId}`);
            dispatch({ type: 'SET_PLAN_DATA', payload: planDataResponse });
            // clears input fields after adding a lift
            setAddLift({ name: '', sets: '', reps: '', weight: '' });
        } catch (error) {
            console.error('Error adding lift:', error);
            alert('Something went wrong while adding the lift!');
        }
    };

    // const handleAddLift = (event) => {
    //     event.preventDefault();
    //     const liftData = {
    //         name: addLift.name,
    //         sets: addLift.sets,
    //         reps: addLift.reps,
    //         weight: addLift.weight,
    //         planId: planId,
    //     };
    //     axios.post('/api/planData/add-lift', liftData)
    //         .then(response => {
    //             console.log('liftData:', liftData); //liftData displays as an object
    //             console.log('planData:', planData); //planData is now an empty object
    //             console.log('Lift added successfully:', response.data);
    //             console.log('current lifts:', planData.lifts);
    //             // fetching plan data
    //             dispatch({ type: 'FETCH_PLAN_DATA' });
    //             setAddLift({ name: '', sets: '', reps: '', weight: '' });
    //         })
    //         .catch(error => {
    //             console.error('Error adding lift:', error);
    //             console.log('error attempting to add planData', planData);
    //             alert('Something went wrong while adding the lift!');
    //         });
    // };

    // const handleDeleteLift = (id) => {
    //     axios.delete(`/api/planData/lifts/${id}`)
    //         .then((response) => {
    //             dispatch({ type: 'FETCH_PLAN_DATA', payload: planId });
    //         })
    //         .catch((error) => {
    //             console.log('error in delete', error);
    //             alert('Something went wrong!');
    //         });
    // };

    // Handle deleting a lift from the plan
    const handleDeleteLift = async (id) => {
        try {
            await axios.delete(`/api/planData/lifts/${id}`);
            console.log('Lift deleted successfully');

            // Fetch the updated plan data after deleting the lift
            const planDataResponse = await axios.get(`/api/planData/${planId}`);
            dispatch({ type: 'SET_PLAN_DATA', payload: planDataResponse.data });
        } catch (error) {
            console.error('Error deleting lift:', error);
            alert('Something went wrong while deleting the lift!');
        }
    };

    const handleCompleteEdit = () => {
        dispatch({ type: 'SET_PLAN_DATA', payload: planData });
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
                        <h2>{planData.plan_name}</h2>
                        <button onClick={() => setEditName(planData.plan_name)}>
                            {editName === '' ? 'Edit Name' : 'Save Name'}
                        </button>
                    </div>
                )}
            </div>

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
                    {planData.lifts && planData.lifts.map((lift) => (
                        <tr key={lift.lift_id}>
                            <td>{lift.lift_name}</td>
                            <td>{lift.sets}</td>
                            <td>{lift.reps}</td>
                            <td>{lift.weight}</td>
                            <td>
                                <button onClick={() => handleDeleteLift(lift.lift_id)}>Delete</button>
                            </td>
                        </tr>
                    )


                    )}
                </tbody>
            </table>

            <form onSubmit={(event) => handleAddLift(event)}>
                <input type="text" placeholder="Lift Name" value={addLift.name} onChange={(e) => setAddLift({ ...addLift, name: e.target.value })} />
                <input type="number" placeholder="Sets" value={addLift.sets} onChange={(e) => setAddLift({ ...addLift, sets: e.target.value })} />
                <input type="number" placeholder="Reps" value={addLift.reps} onChange={(e) => setAddLift({ ...addLift, reps: e.target.value })} />
                <input type="number" placeholder="Weight" value={addLift.weight} onChange={(e) => setAddLift({ ...addLift, weight: e.target.value })} />
                <button type="submit">Add Lift</button>
            </form>

            <button onClick={() => handleCompleteEdit()}>Complete Edit</button>
        </div>
    );
}

export default PlanTemplate;