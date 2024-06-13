import { put, takeLatest, call } from 'redux-saga/effects'; 
import axios from 'axios';

// function* fetchPlanData() {
//     try {
//         const planDataResponse = yield axios.get('/api/planData');
//         yield put({
//             type: 'SET_PLAN_DATA',
//             payload: planDataResponse.data
//         });
//     } catch (error) {
//         console.log('fetchPlanData error:', error);
//     }
// }

// function* planDataSaga() {
//     yield takeLatest('FETCH_PLAN_DATA', fetchPlanData);
// }

function* fetchPlanData(action) {
    try {
      const response = yield call(axios.get, `/api/planData/${action.payload}`);
      yield put({ type: 'SET_PLAN_DATA', payload: response.data });
    } catch (error) {
      console.log('fetchPlanData error:', error);
    }
  }
  
  function* planDataSaga() {
    yield takeLatest('FETCH_PLAN_DATA', fetchPlanData);
  }

export default planDataSaga;