const planDataReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PLAN_DATA':
        console.log('SET_PLAN_DATA action.payload:', action.payload);
        return action.payload;
      case 'UNSET_PLAN_DATA':
        return [];
      default:
        return state;
    }
  };
  
  export default planDataReducer;