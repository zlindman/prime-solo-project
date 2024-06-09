const planDataReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PLAN_DATA':
        return action.payload;
      case 'UNSET_PLAN_DATA':
        return [];
      default:
        return state;
    }
  };
  
  export default planDataReducer;