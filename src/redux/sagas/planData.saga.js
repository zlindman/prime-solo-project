import { put, takeLatest } from 'redux-saga/effects'; 
import axios from 'axios';

function* fetchPlanData() {
    try {
        const planDataResponse = yield axios.get('/api/planData');
        yield put({
            type: 'SET_PLAN_DATA',
            payload: planDataResponse.data
        });
    } catch (error) {
        console.log('fetchPlanData error:', error);
    }
}

function* planDataSaga() {
    yield takeLatest('FETCH_PLAN_DATA', fetchPlanData);
}

export default planDataSaga;